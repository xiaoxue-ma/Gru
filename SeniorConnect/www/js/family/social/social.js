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
        return biography ? '-event_timestamp' : '-timestamp';
    };

    $scope.show = function () {
        $scope.loading = $ionicLoading.show({
            content: $translate.instant('pull_to_refresh')
        });
    };

    function loadFeed() {
        $scope.show();
        if($scope.showAllFeeds)
            $scope.feeds = Feeds.query({user_id: $localstorage.get('user.user_id')},
                checkLastActivity);
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

    //<editor-fold desc="Topic Match from SNS">
    function checkLastActivity(){
        var lastActivity = new Date($scope.feeds[0].timestamp);
        if (lastActivity.getDate() < new Date().getDate() - 3){
            $ionicPopup.confirm({
                title: $translate.instant('social.post_from_sns'),
                template: $translate.instant('social.post_from_sns_body')
            }).then(function(res){
                if (res){
                    selectPostFromSocialNetwork();
                    //TwitterLib.init().then(function (_data) {
                    //    console.log(JSON.stringify(_data));
                    //}, function error(_error) {
                    //    console.log(JSON.stringify(_error));
                    //});
                }
            })
        }
    }

    function selectPostFromSocialNetwork(){
        FacebookToken.get({user_id: $localstorage.get('user.user_id')}, function(data){
            if (data.status == 200) {
                OpenFB.setToken(data.message);
                OpenFB.get('/me/posts', {limit: 30}).success(function(result){
                    console.log(result.data);
                    var address = serverAddress + '/topic_match/' +
                            $localstorage.get('user.user_id');
                    $http.post(address , result.data).success(
                        function(data) {
                            if (data.status == 200){
                                postFromSocialNetwork(result.data[data.message]);
                            }
                        }
                    )
                });
            } else {
                $ionicPopup.alert({
                    title: $translate.instant('social.no_link'),
                    template: $translate.instant('social.no_link_body')
                });
            }
        });
    }

    function postFromSocialNetwork(item){
        $ionicPopup.confirm({
            title: $translate.instant('social.post_confirm'),
            template: item.message || item.description
        }).then(function(res){
            if (res){
                var data = {
                    user_id: $localstorage.get('user.user_id'),
                    text_content: item.message || item.description,
                    event_timestamp: new Date(item.updated_time)
                        .toISOString().slice(0, 19).replace('T', ' ')
                };
                Status.save(data, function(result){
                    if (result.status == 200){
                        $ionicPopup.alert({
                            title: $translate.instant('social.post_successfully')
                        })
                    } else {
                        $ionicPopup.alert({
                            title: $translate.instant('social.post_failed'),
                            template: result.message
                        })
                    }
                });
            }
        });
    }
    //</editor-fold>

    //<editor-fold desc="Likes and Comments">
    $scope.setDisplayPane = function setDisplayPane(item, pane) {
        $scope.currentItem = item;
        $scope.currentDisplayPane = pane;
        $scope.displayReplyTarget = "post";
        $scope.person_to_reply = "";
    };

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

    $scope.sendComment = function(comment, status_item){
        if ($scope.person_to_reply === ""){
            $scope.person_to_reply = status_item.author.ID;
        }
        var data = {
            status_id: status_item.id,
            text_content: comment.text_content,
            from_user_id: $localstorage.get('user.user_id'),
            to_user_id: $scope.person_to_reply
        };
        Comment.save(data);
    };

    $scope.commentClicked = function(comment, status_item){
        $scope.displayReplyTarget = comment.from_user;
        $scope.person_to_reply = comment.sent_by_user_id;
    };
    //</editor-fold>

    //<editor-fold desc="New Post">
    $scope.newPost = function () {
        $ionicActionSheet.show({
            buttons: [
                {text: $translate.instant('social.take_photo')},
                {text: $translate.instant('social.select_photos_from_phone')},
                {text: $translate.instant('social.text_only')}
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
