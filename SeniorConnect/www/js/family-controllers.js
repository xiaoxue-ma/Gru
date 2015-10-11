var sac = angular.module('family.controllers', ['family.utils', 'pascalprecht.translate','calendar']);
var serverPictureAddress = serverAddress + "/pic/";
var serverIconAddress = serverAddress + "/icon/";

sac.constant('twitterConfig', {
    oauthSettings: {
        consumerKey: 'ZsXQz4aQRc5CQ9NvXq9oJpSfF',
        consumerSecret: 'aoYHe7qAEiC367ClcJqa1YUk7YbGxNOpTtiLIWOYnBwXimG6ym',
        requestTokenUrl: 'https://api.twitter.com/oauth/request_token',
        authorizationUrl: "https://api.twitter.com/oauth/authorize",
        accessTokenUrl: "https://api.twitter.com/oauth/access_token",
        callbackUrl: "callbackUrl"
    }
});

sac.config(function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s(https|file|blob|cdvfile):|data:image\//);
});

sac.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    for (lang in translations) {
        $translateProvider.translations(lang, translations[lang]);
    }
    $translateProvider.preferredLanguage('English');
});

sac.run(function($localstorage){
    // debug purpose!!!
    $localstorage.set('user.user_id', 1);
    // delete!!

    $localstorage.setObject('messages', [])
});

sac.controller('FamilyTabsCtrl', ['$scope', 'chatUnreadCountService',
    function($scope, chatUnreadCountService){
        $scope.$watch(function(){
            return chatUnreadCountService.count;
        }, function() {
            $scope.chatCount = chatUnreadCountService.count;
        });
}]);
