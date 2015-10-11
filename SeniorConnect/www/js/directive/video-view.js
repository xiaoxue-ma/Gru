sac.directive('videoView', function ($rootScope, $timeout) {
        return {
            restrict: 'E',
            template: '<div class="video-container"></div>',
            replace: true,
            link: function (scope, element, attrs) {
                function updatePosition() {
                    console.log('update position');
                    cordova.plugins.phonertc.setVideoView({
                        container: element[0],
                        local: {
                            position: [0, 0],
                            size: [50, 50]
                        }
                    });
                }

                $timeout(updatePosition, 500);
                $rootScope.$on('videoView.updatePosition', updatePosition);
            }
        }
    });