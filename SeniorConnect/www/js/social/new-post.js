sac.controller('SocialNewPostCtrl', function ($scope, $state, $http, $stateParams,
                                              $localstorage, $cordovaCamera, $cordovaImagePicker,
                                              $ionicActionSheet, $ionicPopup,
                                              $cordovaFileTransfer, Status){
    $scope.publish = function(){
        var data = {
            user_id: $localstorage.get('user.user_id')
        };
        publishStatus(data);
    };

    function publishStatus(data){
        Status.save(data, function (data, status, headers, config) {
            console.log(data);
            if (data.status == 200) {
                // upload photo if status post is successful
                var status_id = data.message;
                var add = serverAddress + '/pic/' + status_id + '/';
                for (var i = 0; i < $scope.imgURI.length; i++) {
                    $cordovaFileTransfer.upload(add + i, $scope.imgURI[i], {});
                }
            }
            $scope.imgURI = [];
            $state.go('tab.social');
        });
    }

    $scope.cancel = function(){
        $state.go('tab.social');
    };

    //<editor-fold desc="Photo Taking and Selection">
    $scope.takePicture = function() {
        var options = {
            quality : 100,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            saveToPhotoAlbum: true
        };
        $cordovaCamera.getPicture(options).then(function(result) {
            window.resolveLocalFileSystemURL(result, success, failed);
            function success(fileEntry) {
                var internalUrl = fileEntry.toURL();
                $scope.$apply(function () {
                    console.log(internalUrl);
                    $scope.imgURI.push(internalUrl);
                });
                $scope.refreshImage();
            }

            function failed(){

            }
        }, function(err) {
            // An error occured
        });
    };

    $scope.selectExistingPicture = function() {
        var options = {
            maximumImagesCount: 9 - $scope.imgURI.length,
            quality: 100
        };

        $cordovaImagePicker.getPictures(options)
            .then(function (results) {
                for (var i = 0; i < results.length; i++) {
                    window.resolveLocalFileSystemURL(results[i], success, failed);
                    function success(fileEntry) {
                        var internalUrl = fileEntry.toURL();
                        $scope.$apply(function () {
                            $scope.imgURI.push(internalUrl);
                        });
                        $scope.refreshImage();
                    }
                    function failed(){

                    }
                }
            }, function(error) {
                // error getting photos
            });
    };

    $scope.refreshImage = function(){
        for (var i = 0; i < $scope.imgURI.length; i++) {
            var pic = document.getElementById('pic-' + i);
            pic.src = $scope.imgURI[i];
        }
    };

    $scope.addMorePhoto = function(){
        $ionicActionSheet.show({
            buttons: [
                {text: 'Take Photo'},
                {text: 'Select Photos from Phone'}
            ],
            titleText: 'Add more photos',
            buttonClicked: function (index) {
                if (index == 0) {
                    $scope.takePicture();
                }
                if (index == 1) {
                    $scope.selectExistingPicture();
                }
                return true;
            }
        });
    };

    $scope.removePhoto = function(index){
        $ionicPopup.confirm({
            title: 'Delete photo',
            template: 'This photo will not be uploaded.'
        })
            .then(function(res) {
                if(res) {
                    // strangely apply is not required here!
                    $scope.imgURI.splice(index, 1);
                    $scope.refreshImage();
                } else {
                }
            });
    };

    $scope.$on("$ionicView.enter", function() {
        if(!$scope.imgURI || $scope.imgURI.length == 0) {
            $scope.imgURI = [];
        }
    });

    $scope.$on("$ionicView.leave", function() {
        $scope.imgURI = [];
    });
    //</editor-fold>
});
