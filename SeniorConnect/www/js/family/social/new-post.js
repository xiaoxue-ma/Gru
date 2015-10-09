/**
 * Created by Siyao on 2015/9/26.
 */


sac.controller('SocialNewPostCtrl', function ($scope, $state, $http, $stateParams,
                                              $localstorage, $cordovaGeolocation,
                                              $cordovaCamera, $cordovaImagePicker,
                                              $ionicActionSheet, $ionicPopup,
                                              $cordovaFileTransfer, $cordovaDatePicker,
                                              Status){
    $scope.publish = function(status){
        var data = {
            user_id: $localstorage.get('user.user_id'),
            text_content: status.text_content,
            tags: status.tags,
            location: status.location,
            event_timestamp: status.event_time
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
            $state.go('tab.family.social');
        });
    }

    $scope.cancel = function(){
        $state.go('tab.family.social');
    };

    //<editor-fold desc="Geolocation and Datepicker">
    $scope.getLocation = function(status){
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                status.location = position.coords.latitude + ', '
                    + position.coords.longitude;
            }, function(error) {});
    };

    $scope.pickDate = function(status){
        var options = {
            date: new Date(),
            mode: 'date'
        };
        $cordovaDatePicker.show(options).then(function(date){
            status.event_time = date.toJSON();
        });
    };
    //</editor-fold>

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

    function onStartTakePicture(){
        $scope.imgURI = [];
        if ($state.is('single-page.social-new-post-new-photo')){
            $scope.takePicture();
        } else if ($state.is('single-page.social-new-post-upload-photo')){
            $scope.selectExistingPicture();
        }
    }

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
    // On enter, trigger camera if there is no existing picture.
    // Avoid double trigger when view is back from camera
    $scope.$on("$ionicView.enter", function() {
        if(!$scope.imgURI || $scope.imgURI.length == 0) {
            $scope.imgURI = [];
            onStartTakePicture();
        }
    });

    // On leave, clear selected images
    $scope.$on("$ionicView.leave", function() {
        $scope.imgURI = [];
    });
    //</editor-fold>
});
