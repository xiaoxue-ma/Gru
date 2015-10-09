sac.controller('FriendsCtrl', function ($scope, $ionicActionSheet, $localstorage, $state,
                                        $ionicPopup, $ionicLoading, Friends, $translate) {
    $scope.serverPictureAddress = serverPictureAddress;
    $scope.serverIconAddress = serverIconAddress;

    $scope.show = function () {
        $scope.loading = $ionicLoading.show({
            content: $translate.instant('pull_to_refresh')
        });
    };

    function loadFriends() {
        $scope.show();
        $scope.friends = Friends.list.query({user_id: $localstorage.get('user.user_id')});
        $scope.requests = Friends.request.query({user_id: $localstorage.get('user.user_id')});
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.refresh = loadFriends;
    loadFriends();

    $scope.addFriend = function () {
        $ionicActionSheet.show({
            buttons: [
                {text: $translate.instant('friends.add_by_phone_number')},
                {text: $translate.instant('friends.add_from_contacts')}
            ],
            titleText: $translate.instant('friends.new_friend'),
            buttonClicked: function (index) {
                if (index == 0) {
                    addFriendByPhoneDialog();
                }
                if (index == 1) {
                    $state.go('single-page.add-friend-from-contacts');
                }
                return true;
            }
        })
    };

    function addFriendByPhoneDialog(){
        $scope.user = {};
        $ionicPopup.show({
            templateUrl: 'templates/family/friend/add-friend-by-number.html',
            title: $translate.instant('friends.add_by_phone_number'),
            scope: $scope,
            buttons: [
                { text: $translate.instant('cancel') },
                {
                    text: $translate.instant('add'),
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.user.phone_number) {
                            //don't allow the user to close unless he enters phone number
                            e.preventDefault();
                        } else {
                            var post_data = {
                                user_id1: $localstorage.get('user.user_id'),
                                target_phone_number: $scope.user.phone_number,
                                relationship: $scope.user.relationship,
                                nickname: $scope.user.nickname
                            };
                            Friends.request.save(post_data);
                        }
                    }
                }
            ]
        });
    }

    $scope.deleteFriend = function(index){
        $ionicPopup.confirm({
            title: 'Delete friend',
            template: 'Are you sure? You will be removed from his friend list too.'
        })
            .then(function(res) {
            if(res) {
                var data = {
                    user_id1: $localstorage.get('user.user_id'),
                    user_id2: $scope.friends[index].ID
                };
                Friends.instance.delete(data, function (data, status, headers, config) {
                    if (data.status == 200){
                        $scope.friends.splice(index, 1);
                    }
                });
            }
        });
    };
});

sac.controller('AddFriendFromContactsCtrl', function ($scope, $localstorage, $cordovaContacts) {

    function getContactList() {
        $cordovaContacts.find({filter: ''}).then(function(result) {
            $scope.contacts = result.filter(function(v) {
                return v.phoneNumbers;
            });
        }, function(error) {
        });

    }
    getContactList();
    $scope.setAll = function(value){
        $scope.contacts.forEach(function(v){
            v.checked = value;
        });
    };

    $scope.addSelectedContacts = function(){
        $scope.contacts.forEach(function(v){
            if (v.checked) {
                var post_data = {
                    user_id1: $localstorage.get('user.user_id'),
                    target_phone_number: v.phoneNumbers[0].value,
                    relationship: '',
                    nickname: v.displayName
                };
                Friends.request.save(post_data);
            }
        });
    };
});

sac.controller('FriendRequestCtrl', function ($scope, $localstorage, Friends){
    $scope.requests = Friends.request.query({user_id: $localstorage.get('user.user_id')});

    $scope.accept = function(index){
        var data = {
            user_id1: $localstorage.get('user.user_id'),
            user_id2: $scope.requests[index].ID
        };
        Friends.request.accept(data, function (data, status, headers, config) {
            if (data.status == 200) {
                $scope.requests.splice(index, 1);
            }
        });
    };

    $scope.ignore = function(index){
        var data = {
            user_id1: $localstorage.get('user.user_id'),
            user_id2: $scope.requests[index].ID
        };
        Friends.instance.delete(data, function (data, status, headers, config) {
            if (data.status == 200) {
                $scope.requests.splice(index, 1);
            }
        });
    };
});

sac.controller('FriendDetailCtrl', function ($scope, $stateParams, $ionicActionSheet,
                                             $localstorage, $state, Friends) {
    $scope.serverPictureAddress = serverPictureAddress;
    $scope.serverIconAddress = serverIconAddress;
    $scope.friend = Friends.instance.get({user_id1: $localstorage.get('user.user_id'), user_id2: $stateParams.friendId});
    $scope.saveFriendDetails = function saveFriendDetails(friend){
        var data = {
            user_id1: $localstorage.get('user.user_id'),
            user_id2: $stateParams.friendId,
            relationship: friend.relationship,
            nickname: friend.nickname
        };
        Friends.instance.update(data, function (data, status, headers, config) {
            if (data.status == 200) {
                $state.go('tab.friends');
            }
        });
    };

    console.log($scope.friend);
});
