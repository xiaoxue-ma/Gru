sac.controller('AccountCtrl', function ($scope, $translate, $localstorage, $ionicPopup, Friends) {
    function init(){
        $scope.translations = translations;
        $scope.currentLanguage = $translate.use();
      $scope.serverPictureAddress = serverPictureAddress;
      $scope.serverIconAddress = serverIconAddress;
      $scope.user = Friends.instance.get({user_id1: $localstorage.get('user.user_id'), user_id2: $localstorage.get('user.user_id')});
    }

    init();

    $scope.setLanguage = function (currentLanguage){
        $translate.use(currentLanguage);
    };

});
