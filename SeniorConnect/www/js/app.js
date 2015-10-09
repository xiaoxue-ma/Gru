//<editor-fold desc="Initialization of angular module">
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
    }).config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position("bottom");

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:
            .state( 'tab.home', {
                url: '/home',
                views: {
                    'tab-home' : {
                        templateUrl: 'templates/home.html'
                    }
                }
            })

            .state('tab.health', {
                url: '/health',
                views: {
                    'tab-health': {
                        templateUrl: 'templates/tab-health.html'
                    }
                }
            })

            .state('tab.memory', {
                url: '/memory',
                views: {
                    'tab-memory': {
                        templateUrl: 'templates/tab-memory.html'
                    }
                }
            })

            .state('tab.world', {
                url: '/world',
                views: {
                    'tab-world': {
                        templateUrl: 'templates/tab-world.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/family/social');

    });


