sac.controller('VideoCallCtrl', function ($scope, $state, $rootScope, $timeout, $stateParams, RtcSocket, $localstorage) {
    $scope.callInProgress = false;
    $scope.isCalling = $stateParams.isCalling === 'true';
    $scope.counterParty = $stateParams.userId;
    $scope.myself = $localstorage.get('user.user_id');
    $scope.currentSession = null;

    $scope.$on("$ionicView.enter", function() {
        if ($scope.isCalling) {
            console.log("send calling message");
            RtcSocket.sendMessage($scope.myself, $scope.counterParty, { type: 'call' });
        }
    });

    function call(isInitiator, userId) {
        var config = {
            isInitiator: isInitiator,
            turn: {
                host: phonertcTurnServerConfig.host,
                username: phonertcTurnServerConfig.username,
                password: phonertcTurnServerConfig.password
            },
            streams: {
                audio: true,
                video: false
            }
        };
        console.log(config);
        var session = new cordova.plugins.phonertc.Session(config);
        console.log(cordova.plugins.phonertc.Session);
        console.log(session);

        session.on('sendMessage', function (data) {
            RtcSocket.sendMessage($scope.myself, userId, {
                type: 'phonertc_handshake',
                data: JSON.stringify(data)
            });
        });

        session.on('answer', function () {
            console.log('Answered!');
        });

        session.on('disconnect', function () {
            console.log('disconnect event');
            console.log("closing session");
            $scope.currentSession.close();
            console.log("deleting session");
            delete $scope.currentSession;
            console.log("setting transition");
            RtcSocket.sendMessage($scope.myself, userId, { type: 'ignore' });
            $scope.currentSession = null;
            $scope.callInProgress = false;
            $state.go('tab.chats');
        });

        session.call();
        $scope.currentSession = session;
    }

    $scope.ignore = function () {
        RtcSocket.sendMessage($scope.myself, $scope.counterParty, { type: 'ignore' });
        $state.go('tab.chats');
    };


    $scope.end = function () {
        console.log('end call');
        RtcSocket.sendMessage($scope.myself, $scope.counterParty, { type: 'ignore' });
        console.log("closing session");
        $scope.currentSession.close();
        console.log("deleting session");
        delete $scope.currentSession;
        console.log("setting transition");
        $scope.currentSession = null;
        $scope.callInProgress = false;
        $state.go('tab.chats');
    };

    $scope.answer = function () {
        if ($scope.callInProgress) { return; }
        $scope.callInProgress = true;
        $timeout($scope.updateVideoPosition, 1000);
        call(false, $scope.counterParty);
        setTimeout(function () {
            RtcSocket.sendMessage($scope.myself, $scope.counterParty, { type: 'answer' });
        }, 1500);
    };

    $scope.updateVideoPosition = function () {
        $rootScope.$broadcast('videoView.updatePosition');
    };

    $scope.updateVideoPosition();

    function onMessageReceive (message) {
        console.log("message YES!!");
        switch (message.type) {
            case 'answer':
                $scope.$apply(function () {
                    $scope.callInProgress = true;
                    $timeout($scope.updateVideoPosition, 1000);
                });
                call(true, message.from);
                break;

            case 'ignore':
                console.log('ignore event');
                if ($scope.currentSession != null){
                    console.log("closing session");
                    $scope.currentSession.close();
                    console.log("deleting session");
                    delete $scope.currentSession;
                    console.log("setting transition");
                    $scope.currentSession = null;
                    $scope.callInProgress = false;
                    $state.go('tab.chats');
                } else {
                    $state.go('tab.chats');
                }
                break;

            case 'phonertc_handshake':
                $scope.currentSession.receiveMessage(JSON.parse(message.data));
                break;
        }
    }

    RtcSocket.socket.on('messageReceived', onMessageReceive);

    $scope.$on('$destroy', function() {
        RtcSocket.socket.removeListener('messageReceived', onMessageReceive);
    });
});