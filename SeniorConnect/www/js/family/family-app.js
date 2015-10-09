/**
 * Created by Siyao on 2015/3/26.
 */
mod.config(function($compileProvider){
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

mod.config(function ($stateProvider, $urlRouterProvider) {

    //<editor-fold desc="Main Page Tab State Area">
    $stateProvider

        .state('tab.family', {
            url: "/family",
            abstract: true,
            views: {
                'tab-family':{
                    templateUrl: "templates/family/tabs.html",
                    controller: 'FamilyTabsCtrl'
                }
            }
        })

        .state('single-page', {
            url: "/single-page",
            abstract: true,
            templateUrl: "templates/family/single-page-container.html"
        })

        .state('tab.family.social', {
            url: '/social',
            views: {
                'tab-family-social': {
                    templateUrl: 'templates/family/tab-social.html',
                    controller: 'SocialCtrl'
                }
            }
        })

        .state('tab.family.friend-social', {
            url: '/social/:friendId',
            views: {
                'tab-family-social': {
                    templateUrl: 'templates/family/tab-social.html',
                    controller: 'SocialCtrl'
                }
            }
        })

        .state('single-page.social-new-post-text-only', {
            url: '/family/social/new-post-text-only',
            views: {
                'main-view': {
                    templateUrl: 'templates/family/social/new-post-text-only.html',
                    controller: 'SocialNewPostCtrl'
                }
            }
        })

        .state('single-page.social-new-post-new-photo', {
            url: '/family/social/new-post-with-photo',
            views: {
                'main-view': {
                    templateUrl: 'templates/family/social/new-post-with-photo.html',
                    controller: 'SocialNewPostCtrl'
                }
            }
        })

        .state('single-page.social-new-post-upload-photo', {
            url: '/family/social/new-post-upload-photo',
            views: {
                'main-view': {
                    templateUrl: 'templates/family/social/new-post-with-photo.html',
                    controller: 'SocialNewPostCtrl'
                }
            }
        })

        .state('tab.family.chats', {
            url: '/chats',
            views: {
                'tab-family-chats': {
                    templateUrl: 'templates/family/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.family.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-family-chats': {
                    templateUrl: 'templates/family/chat/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

        .state('single-page.manage-a-group', {
            url: '/family/chats/manage-a-group/:groupId',
            views: {
                'main-view': {
                    templateUrl: 'templates/family/chat/manage-a-group.html',
                    controller: 'ChatgroupDetailCtrl'
                }
            }
        })

        .state('single-page.manage-all-groups', {
            url: '/family/chats/manage-all-groups',
            views: {
                'main-view': {
                    templateUrl: 'templates/family/chat/manage-all-groups.html',
                    controller: 'ChatgroupCtrl'
                }
            }
        })

        .state('tab.family.friends', {
            url: '/friends',
            views: {
                'tab-family-friends': {
                    templateUrl: 'templates/family/tab-friends.html',
                    controller: 'FriendsCtrl'
                }
            }
        })

        .state('single-page.add-friend-from-contacts', {
            url: '/family/friend/add-from-contacts',
            views: {
                'main-view': {
                    templateUrl: 'templates/family/friend/add-friend-from-contacts.html',
                    controller: 'AddFriendFromContactsCtrl'
                }
            }
        })

        .state('tab.family.friend-requests', {
            url: '/friend/requests',
            views: {
                'tab-family-friends': {
                    templateUrl: 'templates/family/friend/view-friend-requests.html',
                    controller: 'FriendRequestCtrl'
                }
            }
        })

        .state('tab.family.friend-detail', {
            url: '/friend/:friendId',
            views: {
                'tab-family-friends': {
                    templateUrl: 'templates/family/friend/friend-detail.html',
                    controller: 'FriendDetailCtrl'
                }
            }
        })

        .state('tab.family.account', {
            url: '/account',
            views: {
                'tab-family-account': {
                    templateUrl: 'templates/family/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        });
      //.state('tab.family.community', {
      //  url: '/community',
      //  views: {
      //    'tab-family-community': {
      //      templateUrl: 'templates/family/tab-community.html',
      //      controller: 'CommunityCtrl'
      //    }
      //  }
      //})
      //
      //.state('tab.family.community-event', {
      //  url: '/community/event',
      //  views: {
      //    'tab-family-community': {
      //      templateUrl: 'templates/family/community/events.html',
      //      controller: 'CommunityEventCtrl'
      //    }
      //  }
      //});

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
    //</editor-fold>
});
