sac.controller('AccountCtrl', function ($scope, $translate, OpenFB, FacebookToken,
                                        $localstorage, $ionicPopup, Friends) {
    function init(){
        $scope.translations = translations;
        $scope.currentLanguage = $translate.use();
      $scope.serverPictureAddress = serverPictureAddress;
      $scope.serverIconAddress = serverIconAddress;
      $scope.user = Friends.instance.get({user_id1: $localstorage.get('user.user_id'), user_id2: $localstorage.get('user.user_id')});
        FacebookToken.get({user_id: $localstorage.get('user.user_id')}, function(data){
            if (data.status == 200) {
                OpenFB.setToken(data.message);
                OpenFB.get('/me').success(function(user){
                    $scope.isFacebookConnected = user;
                });
            } else {
                $scope.isFacebookConnected = false;
            }
        });
    }

    init();

    $scope.setLanguage = function (currentLanguage){
        $translate.use(currentLanguage);
    };

    $scope.manageFacebookConnection = function () {
        console.log($scope.isFacebookConnected);
        if (!$scope.isFacebookConnected){
            connectToFacebook();
        } else {
            disconnectFacebook();
        }
    };

    function updateFacebookToken(){
        var token_data = {
            user_id: $localstorage.get('user.user_id'),
            fb_token: OpenFB.getToken()
        };
        FacebookToken.update(token_data);
    }

    function connectToFacebook(){
        OpenFB.login('email,read_stream,publish_stream').then(
            function () {
                OpenFB.get('/me').success(function (user) {
                    $scope.isFacebookConnected = user;
                    updateFacebookToken();
                    $ionicPopup.alert({
                        title: $translate.instant('account.facebook_connected')
                    });
                });
            }, function () {
                $ionicPopup.alert({
                    title: $translate.instant('facebook_failed')
                });
            });
    }

    function disconnectFacebook(){
        $ionicPopup.confirm({
            title: $translate.instant('account.facebook_disconnect'),
            template: $translate.instant('account.facebook_disconnect_body')
        }).then(function(res) {
            if(res) {
                OpenFB.setToken('');
                $scope.isFacebookConnected = false;
                updateFacebookToken();
            }
        });
    }
});
