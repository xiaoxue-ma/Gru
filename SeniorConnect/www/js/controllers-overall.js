var sac = angular.module('sc.controllers', ['sc.utils', 'pascalprecht.translate','calendar']);
var serverPictureAddress = serverAddress + "/pic/";
var serverIconAddress = serverAddress + "/icon/";
var serverChatImageAddress = serverAddress + "/chat_image/";

sac.config(function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(local|http|https|app|tel|ftp|file|blob|content|ms-appx|x-wmapp0|cdvfile):|data:image\//);
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
