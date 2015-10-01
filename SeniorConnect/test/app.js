/**
 * Created by Boss on 1/10/15.
 */
angular.module('ionicApp', ['ionic', 'stateBackButtonIonic'])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('scaffold', {
        abstract: true,
        templateUrl: "templates/scaffold.html"
      })
      .state('tabs', {
        url: "/tab",
        parent: "scaffold",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state('home', {
        url: "/home",
        parent: "tabs",
        views: {
          'home-tab': {
            templateUrl: "templates/home.html",
            controller: 'HomeTabCtrl'
          }
        }
      })
      .state('home.facts', {
        url: "/facts",
        views: {
          'home-tab@tabs': {
            controller: "FactsCtrl",
            templateUrl: "templates/facts.html"
          }
        }
      })
      .state('home.facts.facts2', {
        url: "/facts2",
        views: {
          'home-tab@tabs': {
            templateUrl: "templates/facts2.html"
          }
        }
      })
      .state('tabs.about', {
        url: "/about",
        views: {
          'about-tab': {
            templateUrl: "templates/about.html"
          }
        }
      })
      .state('tabs.navstack', {
        url: "/navstack",
        views: {
          'about-tab': {
            templateUrl: "templates/nav-stack.html"
          }
        }
      })
      .state('tabs.contact', {
        url: "/contact",
        views: {
          'contact-tab': {
            templateUrl: "templates/contact.html"
          }
        }
      });


    $urlRouterProvider.otherwise("/tab/home");

  })
  .controller('HomeTabCtrl', function($scope) {
    console.log('HomeTabCtrl');
  })
  .controller('FactsCtrl', function($ionicNavBarDelegate) {
    console.log('FactsCtrl');
  });

angular.module('stateBackButtonIonic', [])
  .config(function($provide) {
    $provide.decorator('$ionicViewService', function($delegate, $rootScope) {
      var registerFunction = $delegate.register;

      $delegate.register = function() {
        var viewHistory = $rootScope.$viewHistory,
          rsp         = registerFunction.apply(this, arguments);

        if(viewHistory.forcedBack) {
          rsp.navAction = 'moveBack';
          rsp.navDirection = 'back';
          viewHistory.forcedBack = null;

          this.clearHistory();
        }

        return rsp;
      };
      return $delegate;
    });
  })
  .directive('prNavBackButton', function($animate, $rootScope, $sanitize, $state, $ionicNavBarConfig, $ionicNgClick) {
    var backIsShown = false,
      viewHistory = $rootScope.$viewHistory;

    function backViewIsPresent() {
      return viewHistory.backView && viewHistory.backView.historyId === viewHistory.currentView.historyId;
    }

    function parentStateIsPresent() {
      return !$state.$current.parent.abstract;
    }

    // Everytime history changes, check if the back button should be shown
    // We ignore ionic's data saying whether it should be or not, favoring our own logic
    $rootScope.$on('$viewHistory.historyChange', function() {
      backIsShown = backViewIsPresent() || parentStateIsPresent();
    });

    return {
      restrict: 'E',
      require: '^ionNavBar',
      compile: function(tElement) {
        tElement.addClass('button back-button ng-hide');

        var hasIconChild = !!(tElement.html() || '').match(/class=.*?ion-/);

        return function($scope, $element, $attr, navBarCtrl) {

          // Add a default back button icon based on the nav config, unless one is set
          if (!hasIconChild && $element[0].className.indexOf('ion-') === -1) {
            $element.addClass($ionicNavBarConfig.backButtonIcon);
          }

          //Default to ngClick going back, but don't override a custom one
          if (!angular.isDefined($attr.ngClick)) {
            $ionicNgClick($scope, $element, function() {
              if (backViewIsPresent()) {
                navBarCtrl.back();
              } else if (parentStateIsPresent()) {
                viewHistory.forcedBack = true;
                $state.go('^');
              } else {
                return false;
              }
            });
          }

          //Make sure both that a backButton is allowed in the first place,
          //and that it is shown by the current view.
          $scope.$watch(function() {
            if(angular.isDefined($attr.fromTitle)) {
              $element[0].innerHTML = '<span class="back-button-title">' + $sanitize($scope.oldTitle) + '</span>';
            }
            return !!(backIsShown && $scope.backButtonShown);
          }, ionic.animationFrameThrottle(function(show) {
            if (show) { $animate.removeClass($element, 'ng-hide');
            } else { $animate.addClass($element, 'ng-hide'); }
          }));
        };
      }
    };
  })
  .directive('ionTabs', function($rootScope, $state) {
    var viewHistory = $rootScope.$viewHistory;

    function getTabRootState(state) {
      var isRootState;

      if (state.parent.self.abstract === true) {
        isRootState = state.self.name;
      } else {
        isRootState = false;
      }

      return  isRootState || getTabRootState(state.parent);
    }

    return {
      restrict: 'E',
      require: 'ionTabs',
      link: function(scope, element, attr, ctrl) {
        var selectTab = ctrl.select;

        ctrl.select = function(tab, shouldEmitEvent) {
          var selectedTab = ctrl.selectedTab();

          if (selectedTab && selectedTab.$historyId == tab.$historyId) {
            if (shouldEmitEvent) {
              viewHistory.forcedBack = true;
              $state.go(getTabRootState($state.$current))
            }
          } else {
            selectTab.apply(this, arguments);
          }
        };
      }
    };
  });
