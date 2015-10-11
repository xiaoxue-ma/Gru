sac.controller('SocialCtrl', function ($scope, $ionicLoading, $stateParams, $http,
                                       $ionicActionSheet,$localstorage, $state,
                                       $ionicModal, Feeds, Status, Like, Comment,
                                       FacebookToken, $ionicPopup, OpenFB, $timeout,
                                       TwitterLib, $translate, $ionicScrollDelegate) {
    $scope.serverPictureAddress = serverPictureAddress;
    $scope.serverIconAddress = serverIconAddress;
    $scope.showAllFeeds = !$state.is("tab.family.friend-social");

    //<editor-fold desc="Feeds loading and display">
    $scope.sorter = function(biography){
        return '-timestamp';
    };

    $scope.show = function () {
        $scope.loading = $ionicLoading.show({
            content: $translate.instant('pull_to_refresh')
        });
    };

    function loadFeed() {
        $scope.show();
        if($scope.showAllFeeds)
            $scope.feeds = Feeds.query({user_id: $localstorage.get('user.user_id')});
        else
            $scope.feeds = Status.query({user_id: $stateParams.friendId});

        $scope.likedItemsLocal = [];
        $scope.person_to_reply = "";
        $scope.currentItem = 0;
        $scope.currentDisplayPane = 0;

        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.refresh = loadFeed;
    loadFeed();

    //</editor-fold>

    //<editor-fold desc="Likes and Comments">
    $scope.like = function(item){
        var data = {
            status_id: item.id,
            user_id: $localstorage.get('user.user_id')
        };
        Like.status.save(data, function () {
            $scope.likedItemsLocal.push(item.id);
            var idx = $scope.likedItemsLocal.indexOf(-item.id);
            if (idx != -1){
                $scope.likedItemsLocal.splice(idx, 1);
            }
        });
    };

    $scope.dislike = function(item){
        var data = {
            status_id: item.id,
            user_id: $localstorage.get('user.user_id')
        };
        Like.status.dislike(data, function () {
            $scope.likedItemsLocal.push(-item.id);
            var idx = $scope.likedItemsLocal.indexOf(item.id);
            if (idx != -1){
                $scope.likedItemsLocal.splice(idx, 1);
            }
        });
    };

    $scope.alreadyLiked = function (status){
        if ($scope.likedItemsLocal.indexOf(status.id) != -1 &&
            $scope.likedItemsLocal.indexOf(-status.id) == -1){
            return true;
        }
        if ($scope.likedItemsLocal.indexOf(-status.id) != -1 &&
            $scope.likedItemsLocal.indexOf(status.id) == -1){
            return false;
        }
        var IDList = status.likes.map(function(v) {
            return v.ID;
        });
        return IDList.indexOf(parseInt($localstorage.get('user.user_id'))) != -1
    };
    //</editor-fold>

    //<editor-fold desc="New Post">
    $scope.newPost = function () {
      $state.go('single-page.social-new-post-new-photo');
      $ionicActionSheet.show({
            buttons: [
                {text: $translate.instant('social.take_photo')},
                {text: $translate.instant('social.select_photos_from_phone')},
            ],
            titleText: $translate.instant('social.create_new_post'),
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
    //</editor-fold>

    //<editor-fold desc="Enlarge photo">
    $ionicModal.fromTemplateUrl('image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.enlargePicture = function(picture_content) {
        $scope.imageSrc = serverPictureAddress + picture_content;
        $scope.openModal();
    };
    //</editor-fold>

});
