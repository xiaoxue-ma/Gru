sac.controller('ChatsCtrl', function ($scope, $localstorage, ChatSocket, ChatData,
                                      chatUnreadCountService, $ionicLoading, RtcSocket,
                                      $ionicActionSheet, $translate, $state) {

    $scope.serverPictureAddress = serverPictureAddress;
    $scope.serverIconAddress = serverIconAddress;

    function init(){
        RtcSocket.establishChannel($localstorage.get('user.user_id'));
        ChatSocket.establishChannel($localstorage.get('user.user_id'));
        $scope.chats = ChatData.list.query({user_id: $localstorage.get('user.user_id')});
    }

    init();
    
    $scope.$on("$ionicView.enter", function(){
        // update unread count and last text based on messages received when in other states
        var messagesReceived = $localstorage.getObject('messages');
        for (var i = 0; i < messagesReceived.length; ++i){
            attachMessageToChat(messagesReceived[i]);
        }
        $localstorage.setObject('messages', []);

        // update unread_count of last entered chat locally
        $scope.chats.forEach(function(item){
            if (item.id == $localstorage.get('chat.last_id')){
                item.unread_count = 0;
                if ($localstorage.get('chat.last_text')){
                    item.lastText = $localstorage.get('chat.last_text');
                }
            }
        });
        $localstorage.remove('chat.last_id');
        calculateUnreadCount();
    });

    $scope.$on("$ionicView.beforeLeave", function(){
        $localstorage.setObject('chats', $scope.chats);
    });

    $scope.refresh = function(){
        $scope.loading = $ionicLoading.show({
            content: $translate.instant('pull_to_refresh')
        });
        $scope.chats = ChatData.list.query({user_id: $localstorage.get('user.user_id')});
        calculateUnreadCount();
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.$on("server.private_message", function(event, msg) {
        attachMessageToChat(msg);
        $scope.$apply();
    });

    $scope.$on("server.group_message", function(event, msg) {
        attachMessageToChat(msg);
        $scope.$apply();
    });

    function calculateUnreadCount(){
        chatUnreadCountService.count = $scope.chats.reduce(function (a, b) {
            return a + b['unread_count'];
        }, 0);
    }

    function attachMessageToChat(msg){
        chatUnreadCountService.count++;
        if (msg.to_group){
            handleGroupMessage(msg);
        } else {
            handlePrivateMessage(msg);
        }
    }

    function handleGroupMessage(msg){
        var existingChat = false;
        $scope.chats.forEach(function (item) {
            if (item.id == msg.to_group) {
                item.unread_count = item.unread_count + 1;
                item.lastText = msg.data;
                existingChat = true;
            }
        });

        if (!existingChat) {
            $scope.chats.unshift({
                id: msg.to_group,
                unread_count: 1,
                icon: 'group.jpg',
                lastText: msg.data,
                name: msg.name
            })
        }
    }

    function handlePrivateMessage(msg){
        var existingChat = false;
        // use the new message to update chats display
        $scope.chats.forEach(function (item) {
            if (item.id == msg.from) {
                ++item.unread_count;
                item.lastText = msg.data;
                existingChat = true;
            }
        });

        if (!existingChat) {
            $scope.chats.unshift({
                id: msg.from,
                unread_count: 1,
                icon: msg.from + '.jpg',
                lastText: msg.data,
                name: msg.name
            })
        }
    }

    $scope.remove = function (index){
        $scope.chats.splice(index, 1);
        calculateUnreadCount();
    };

    $scope.manageGroups = function() {
        $state.go('single-page.manage-all-groups');
    }

});