
sac.controller('ChatDetailCtrl', function ($scope, $stateParams, $localstorage,
                                           ChatSocket, ChatData, Friends, $cordovaMedia,
                                           $ionicScrollDelegate, $timeout, $cordovaFileTransfer,
                                           chatUnreadCountService, $state, localIdentifier) {

    $scope.serverPictureAddress = serverPictureAddress;
    $scope.serverIconAddress = serverIconAddress;

    function init(){
        $scope.isInVoiceMessageMode = true;
        $scope.hideTime = true;
        $scope.myId = $localstorage.get('user.user_id');
        $scope.isGroupChat = $stateParams.chatId.indexOf('g') === 0;
        $scope.isInRecordingMode = false;
        $scope.isInPlaybackMode = false;
    }

    init();

    $scope.loadMoreChatHistory = function() {
        if ($scope.isGroupChat){
            ChatData.groupHistory.query({
                group_id: $stateParams.chatId.substring(1),
                offset: $scope.messages.length
            }, function(result){
                prependMessages(result);
            });
        } else {
            ChatData.privateHistory.query({
                user_id1: $scope.myId,
                user_id2: $stateParams.chatId,
                offset: $scope.messages.length
            }, function(result) {
                prependMessages(result);
            });
        }
        $ionicScrollDelegate.scrollTop(true);
    };

    function prependMessages(msg){
        if (msg.length == 0){
            $scope.canLoadMore = false;
        } else {
            msg.reverse().forEach(function (item){
                $scope.messages.unshift(item);
            });
        }
    }

    $scope.$on("$ionicView.enter", function() {
        $scope.canLoadMore = true;
        // catch last chat id for update of unread count locally
        $localstorage.set('chat.last_id', $stateParams.chatId);
        $localstorage.remove('chat.last_text');

        // set on load retrieval limit
        var chats = $localstorage.getObject('chats');
        var limit = 10;
        chats.forEach(function (item){
            if (item.id == $stateParams.chatId && item.unread_count != 0){
                limit = Math.max(item.unread_count, limit);
                chatUnreadCountService.count -= item.unread_count;
            }
        });

        // Get messages
        if ($scope.isGroupChat){
            $scope.messages = ChatData.groupHistory.query({
                group_id: $stateParams.chatId.substring(1),
                limit: limit
            }, function(){
                $ionicScrollDelegate.scrollBottom(true);
            });
        } else {
            var data = {
                user_id1: $localstorage.get('user.user_id'),
                user_id2: $stateParams.chatId,
                limit: limit
            };
            // friend detail for title display
            $scope.friend = Friends.instance.get(data);
            // each time on enter this chat, set all message as read
            $scope.messages = ChatData.privateHistory.query(data, function(){
                $ionicScrollDelegate.scrollBottom(true);
            });
            ChatData.privateHistory.setAsRead(data);
        }
    });

    $scope.$on("server.private_message", function(event, msg) {
        if (msg.from == $stateParams.chatId){
            // if it is for current chat, display it and save it locally
            $scope.messages.push({
                text_content: msg.data,
                from_user_id: msg.from,
                to_user_id: $scope.myId
            });
            $localstorage.set('chat.last_text', msg.data);
            $ionicScrollDelegate.scrollBottom(true);
            $scope.$apply();
        } else {
            // if it is not for current chat, save it to buffer for further processing
            var messages = $localstorage.getObject('messages');
            messages.push(msg);
            $localstorage.setObject('messages', messages);
        }
    });

    $scope.$on("server.group_message", function(event, msg) {
        if (msg.to_group === $stateParams.chatId){
            // if it is for current chat, display it and save it locally
            $scope.messages.push({
                text_content: msg.data,
                from_user_id: msg.from,
                to_group_id: msg.to_group
            });
            $localstorage.set('chat.last_text', msg.data);
            $ionicScrollDelegate.scrollBottom(true);
            $scope.$apply();
        } else {
            // if it is not for current chat, save it to buffer for further processing
            var messages = $localstorage.getObject('messages');
            messages.push(msg);
            $localstorage.setObject('messages', messages);
        }
    });

    $scope.$on("server.message_reached", function(event, msg){
        console.log('Message ' + msg.local_identifier + ' has reached, returning ID ' + msg.message_id);
        if (msg.type == 'text'){

        } else if (msg.type == 'audio'){
            var add = serverAddress + '/audio/' + msg.message_id;
            $cordovaFileTransfer.upload(add,
                "file:///storage/emulated/0/data/voice" + msg.local_identifier + ".amr", {
                    fileName: 'audio.amr',
                    mimeType: 'audio/AMR'
                }
            );
            $scope.messages.forEach(function (message){
                if (message.local_identifier == msg.local_identifier){
                    message.audio_content = msg.message_id + '.amr';
                }
            });
        }
    });

    $scope.playAudio = function (message) {
        console.log('start to play audio');
        if (message.type == 'audio') {
            var media;
            console.log("group audio");
            media = $cordovaMedia.newMedia(serverAddress + '/audio/' + message.audio_content);
            media.play();
        }
    };

    $scope.sendMessage = function (message, type, length){
        type = type || 'text';
        var data = {
            from: $localstorage.get('user.user_id'),
            to: $stateParams.chatId,
            data: message,
            type: type,
            local_identifier: localIdentifier.id,
            audio_length: length
        };
        if ($scope.isGroupChat) {
            ChatSocket.sendGroupMessage(data);
        } else {
            ChatSocket.sendPrivateMessage(data);
        }
        $scope.messages.push({
            text_content: message,
            from_user_id: $localstorage.get('user.user_id'),
            to_group_id: $stateParams.chatId,
            type: type,
            local_identifier: localIdentifier.id,
            audio_length: length
        });
        $localstorage.set('chat.last_text', message);
        $ionicScrollDelegate.scrollBottom(true);

        localIdentifier.inc();
    };

    $scope.durationTracker = null;

    $scope.record = function(){
        if (!$scope.isInRecordingMode) {
            // TODO: find path for iOS
            $scope.media = $cordovaMedia.newMedia("file:///storage/emulated/0/data/voice"
                + localIdentifier.id + ".amr");
            $scope.isInRecordingMode ^= true;
            $scope.durationTracker = new Date();
            $scope.media.startRecord();
        } else {
            $scope.media.stopRecord();
            $scope.isInRecordingMode ^= true;
            var duration = (new Date() - $scope.durationTracker) / 1000;
            $scope.sendMessage("[Audio], " + duration + " seconds", 'audio', duration);
            $scope.media = null;
            $scope.durationTracker = null;
        }
    };

    $scope.manageGroup = function(){
        $state.go('single-page.manage-a-group', {groupId:$stateParams.chatId.substring(1)});
    };
});
