/**
 * Created by Siyao on 2015/3/26.
 */
mod = angular.module('starter', ['ionic', 'ngCordova', 'openfb', 'twitterLib',
  'family.controllers', 'family.services'])

  .run(function ($ionicPlatform, OpenFB) {

    OpenFB.init('798254143592085', 'https://www.facebook.com/connect/login_success.html');

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });


mod.config(function($compileProvider){
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

mod.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position("bottom");

    //<editor-fold desc="Main Page Tab State Area">
    $stateProvider

        .state('tab', {
            url: "/tab",
            abstract: true,
                templateUrl: "templates/tabs.html",
                controller: 'FamilyTabsCtrl'
        })

        .state('single-page', {
            url: "/single-page",
            abstract: true,
            templateUrl: "templates/single-page-container.html"
        })

        .state('tab.social', {
            url: '/social',
            views: {
                'tab-social': {
                    templateUrl: 'templates/tab-social.html',
                    controller: 'SocialCtrl'
                }
            }
        })

        .state('tab.friend-social', {
            url: '/social/:friendId',
            views: {
                'tab-social': {
                    templateUrl: 'templates/tab-social.html',
                    controller: 'SocialCtrl'
                }
            }
        })

        .state('single-page.social-new-post-text-only', {
            url: '/social/new-post-text-only',
            views: {
                'main-view': {
                    templateUrl: 'templates/social/new-post-text-only.html',
                    controller: 'SocialNewPostCtrl'
                }
            }
        })

        .state('single-page.social-new-post-new-photo', {
            url: '/social/new-post-with-photo',
            views: {
                'main-view': {
                    templateUrl: 'templates/social/new-post-with-photo.html',
                    controller: 'SocialNewPostCtrl'
                }
            }
        })

        .state('single-page.social-new-post-upload-photo', {
            url: '/social/new-post-upload-photo',
            views: {
                'main-view': {
                    templateUrl: 'templates/social/new-post-with-photo.html',
                    controller: 'SocialNewPostCtrl'
                }
            }
        })

        .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

        .state('single-page.manage-a-group', {
            url: '/chats/manage-a-group/:groupId',
            views: {
                'main-view': {
                    templateUrl: 'templates/chat/manage-a-group.html',
                    controller: 'ChatgroupDetailCtrl'
                }
            }
        })

        .state('single-page.manage-all-groups', {
            url: '/chats/manage-all-groups',
            views: {
                'main-view': {
                    templateUrl: 'templates/chat/manage-all-groups.html',
                    controller: 'ChatgroupCtrl'
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

        .state('single-page.add-friend-from-contacts', {
            url: '/friend/add-from-contacts',
            views: {
                'main-view': {
                    templateUrl: 'templates/friend/add-friend-from-contacts.html',
                    controller: 'AddFriendFromContactsCtrl'
                }
            }
        })

        .state('tab.friend-requests', {
            url: '/friend/requests',
            views: {
                'tab-friends': {
                    templateUrl: 'templates/friend/view-friend-requests.html',
                    controller: 'FriendRequestCtrl'
                }
            }
        })

        .state('tab.friend-detail', {
            url: '/friend/:friendId',
            views: {
                'tab-friends': {
                    templateUrl: 'templates/friend/friend-detail.html',
                    controller: 'FriendDetailCtrl'
                }
            }
        })

        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
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
        url: '/community/:communityId',
        views: {
          'tab-community': {
            templateUrl: 'templates/community/events.html',
            controller: 'CommunityEventCtrl'
          }
        }
      });

    //</editor-fold>

    //<editor-fold desc="Initialization State">
    $stateProvider
        .state('init', {
            url: "/init",
            abstract: true,
            templateUrl: 'templates/init/init-container.html',
            controller: 'InitCtrl'
        })
        .state('init.enter_phone_number', {
            url: '/enter_phone_number',
            views: {
                'init-main-view': {
                    templateUrl: 'templates/init/enter-phone-number.html'
                }
            }
        })
        .state('init.verify_phone_number', {
            url: '/verify_phone_number',
            views: {
                'init-main-view': {
                    templateUrl: 'templates/init/verify-phone-number.html'
                }
            }
        })
        .state('init.login', {
            url: '/login',
            views: {
                'init-main-view': {
                    templateUrl: 'templates/init/login.html'
                }
            }
        });

  $urlRouterProvider.otherwise('/tab/social');
    //</editor-fold>
});
