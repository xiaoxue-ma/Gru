var serverAddress = "http://localhost:5000";

angular.module('sc.services', ['ngResource'])

  .factory('Chats', ['$resource',
    function ($resource) {
      return $resource(serverAddress+'/chats',
      { }, {
        query:{method:'GET', params:{user_id:1},isArray:true}
      })
    }])

   .factory('PrivateChat', ['$resource',
    function($resource){
      return $resource(serverAddress+'/private_chat/:user_id1/:user_id2',{},
      { query:{method:'GET', params:{user_id1:1, user_id2:2}, isArray:true}
      })
      }])

  .factory ('UserService', function() {
   var userService = {};
  userService.read = false;
  userService.readEvent = function (value) {
    userService.read = true;
  };
  userService.hasRead = function (value) {
    return userService.read;
  };

  userService.joinedGroup = false;
  userService.joinGroup = function(){
    userService.joinedGroup = true;
  };
  userService.hasJoinedGroup = function () {
    return userService.joinedGroup;
  };
  return userService;
})

// Might use a resource here that returns a JSON array

// Some fake testing data

//var chats = [{
//  id: 0,
//  name: 'Ben Sparrow',
//  lastText: 'You on your way?',
//  face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
//}, {
//  id: 1,
//  name: 'Max Lynx',
//  lastText: 'Hey, it\'s me',
//  face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
//}, {
//  id: 2,
//  name: 'Adam Bradleyson',
//  lastText: 'I should buy a boat',
//  face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
//}, {
//  id: 3,
//  name: 'Perry Governor',
//  lastText: 'Look at my mukluks!',
//  face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
//}, {
//  id: 4,
//  name: 'Mike Harrington',
//  lastText: 'This is wicked good ice cream.',
//  face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
//}];
//
//return {
//  all: function () {
//    return chats;
//  },
//  remove: function (chat) {
//    chats.splice(chats.indexOf(chat), 1);
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
//})

.factory('Friends', ['$resource', function ($resource) {
  return $resource(serverAddress+'/friend',
      { }, {
        //query:{method:'GET', params:{user_id:''},isArray:true}
      })
   }])
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  /*var friends = [{
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
})*/

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


  .factory('ReceivedFriendRequestList', ['$resource', function ($resource) {
      return $resource(serverAddress+'/friend_request',
      { }, {
        query:{method:'GET', params:{user_id:1},isArray:true}
      })
  }])
  /*  var receivedFriendRequestList = [{
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
  })*/
  .factory('Feeds',['resource',
    function($resource){

    }]);


