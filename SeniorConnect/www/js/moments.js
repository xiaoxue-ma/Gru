/**
 * Created by Boss on 25/9/15.
 */
angular.module('sc.moments',[])
  .controller('MomentsCtrl', function($scope){
    $scope.now =0;

    $scope.isliked = function(){
      return $scope.now;
    };
    $scope.like = function(){
      $scope.now = 1;
    };
    $scope.dislike = function(){
      $scope.now = 0;
    };

    $scope.newPost = function () {
      $ionicActionSheet.show({
        buttons: [
          {text: 'social.take_photo'},
          {text: 'social.select_photos_from_phone'},
          {text: 'social.text_only'}
        ],
        titleText: 'social.create_new_post',
        buttonClicked: function (index) {
          if (index == 0) {
            $state.go('single-page.social-new-post-new-photo');
          }
          if (index == 1) {
            $state.go('single-page.social-new-post-upload-photo');
          }
          if (index == 2) {
            $state.go('single-page.social-new-post-text-only');
          }
          return true;
        }
      });
    };
  });
