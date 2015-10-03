angular.module('sc', ['ionic', 'sc.controllers', 'sc.services','stateBackButtonIonic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Learn more here: https://github.com/angular-ui/ui-router
  $stateProvider
    .state('sc', {
      abstract: true,
      templateUrl: "templates/sc.html"
    })
    .state('tab', {
    url: '/tab',
      parent: "sc",
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

    .state('chats', {
      url: '/chats',
      parent: "tab",
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('chats.chat-detail', {
      url: '/:chatId',
      views: {
        'tab-chats@tab': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })

    .state('tab.create-group', {
      url: '/friends/creategroup',
      views: {
        'tab-friends': {
          templateUrl: 'templates/create-group.html',
          controller: 'CreateGroupCtrl'
        }
      }
    })

    .state('tab.get-PhoneContactList', {
      url: '/friends/getPhoneContactList',
      views: {
        'tab-friends': {
          templateUrl: 'templates/get-PhoneContactList.html',
          controller: 'GetPhoneContactListCtrl'
        }
      }
    })

    .state('tab.received-request', {
      url: '/friends/receivedFriendRequest',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friends-receivedRequest.html',
          controller: 'ReceivedFriendRequestListCtrl'
        }
      }
    })

    .state('tab.community', {
    url: '/community',
    views: {
      'tab-community': {
        templateUrl: 'templates/tab-community.html',
        controller: 'CommunityCtrl'
      }
    }
    })

    .state('tab.community-event', {
      url: '/community/event',
      views: {
        'tab-community': {
          templateUrl: 'templates/community-event.html',
          controller: 'CommunityEventCtrl'
        }
      }
    })

    .state('tab.moments', {
      url:'/moments',
      views:{
        'tab-moments':{
          templateUrl: 'templates/tab-moments.html',
          controller: 'MomentsCtrl'
        }
      }
    })



  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/chats');

});
