angular.module('sc.services', ['ngResource'])

  .factory('Chats', ['$resource',
    function ($resource) {
      return $resource('http://127.0.0.1:5000/chats', {}, {
        query: {method:'GET', params:{user_id:1}, isArray:true}
      });

    //return {
    //  all: function () {
    //    return chats;
    //  },
    //  get: function (chatId) {
    //    for (var i = 0; i < chats.length; i++) {
    //      if (chats[i].id === parseInt(chatId)) {
    //        return chats[i];
    //      }
    //    }
    //    return null;
    //  },
    //  add: function(chat){
    //    chats.push(chat);
    //    return chats;
    //  }
    //};
  }])

  .factory('Friends', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var friends = [{
      id: 0,
      name: 'Ben Sparrow',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
      id: 3,
      name: 'Perry Governor',
      face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
      all: function () {
        return friends;
      },
      remove: function (friend) {
        friends.splice(friends.indexOf(friend), 1);
      },
      get: function (friendID) {
        for (var i = 0; i < friends.length; i++) {
          if (friends[i].id === parseInt(friendID)) {
            return friends[i];
          }
        }
        return null;
      }
    };
  })

  .factory('PhoneContactList', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var phoneContactListPeople = [{
      id: 0,
      name: 'Amy Chen',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Celion Dion',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }];

    return {
      all: function () {
        return phoneContactListPeople;
      },
      remove: function (phoneContactListPerson) {
        phoneContactListPeople.splice(phoneContactListPeople.indexOf(phoneContactListPerson), 1);
      },
      get: function (phoneContactListPersonID) {
        for (var i = 0; i < phoneContactListPeople.length; i++) {
          if (phoneContactListPeople[i].id === parseInt(phoneContactListPersonID)) {
            return phoneContactListPeople[i];
          }
        }
        return null;
      }
    };
  })


  .factory('ReceivedFriendRequestList', function () {

    var receivedFriendRequestList = [{
      id: 0,
      name: 'Yi Ersan',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Zhou Zhou',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }];

    return {
      all: function () {
        return receivedFriendRequestList;
      },
      remove: function (receivedFriendRequest) {
        receivedFriendRequestList.splice(receivedFriendRequestList.indexOf(receivedFriendRequest), 1);
      },
      get: function (receivedFriendRequestID) {
        for (var i = 0; i < receivedFriendRequestList.length; i++) {
          if (receivedFriendRequestList[i].id === parseInt(receivedFriendRequestID)) {
            return receivedFriendRequestList[i];
          }
        }
        return null;
      }
    };
  })
  .factory('Feeds',['resource',
    function($resource){

  }]);



