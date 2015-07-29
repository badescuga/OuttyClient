/* global io */
angular.module('starter.services', ['ngOpenFB'])

  .factory('LocalStorage', function () {
    
  return {
    setFacebookUserData: function (data) {
      window.localStorage.setItem('facebookData', JSON.stringify(data));
    }
    ,
     getFacebookUserData: function (data) {
     return JSON.parse(window.localStorage.getItem('facebookData'));
    }
    ,
    setFacebookUserPhotoData: function (data) {
      window.localStorage.setItem('facebookPhotoData', JSON.stringify(data));
    },
     getFacebookUserPhotoData: function (data) {
    return JSON.parse(window.localStorage.getItem('facebookPhotoData'));
    }

  }
})
  .factory('GeneralManager', function () {
    
  })
 .factory('socket', function ($rootScope) {
   //server connect
  var socket = io.connect('localhost:3000');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
})
.factory('socketFactory', function (socket) {
  
 //test 
 //socket.emit('init', {});
// socket.on('init', function (data) {
 //console.log('on init --- from server');
 // });
  ///////////////////
  
 return {
   login : function(data, callback)
   {
     socket.emit('login', function(data) {
     
   });
   }
 }
 
})
  .factory('FBFactory', function (ngFB, LocalStorage) {
  // Defaults to sessionStorage for storing the Facebook token 
  ngFB.init({ appId: '880420071993231' });
  //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage 
  //  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage}); 
//console.log("getting data from local storage: "+JSON.stringify(LocalStorage.getFacebookUserData()));

  console.log("init fb factory");
  return {
    login: function (callback) {
      ngFB.login({ scope: 'email,public_profile,user_friends' }).then(
        function (response) {
          console.log("facebook login succesful, response: " + JSON.stringify(response));
          //   alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
         
         ///////////////////getting user data
        ngFB.api({ path: '/me' })
        .then(function (res) {
     LocalStorage.setFacebookUserData(res);
      }
        , function (err) {
          // error
        });
        //////////// getting user photo data
        ngFB.api({ path: '/me/picture',
        params:{
          redirect:false,
          height:64,
          width:64
        } })
        .then(function (res) {
      LocalStorage.setFacebookUserPhotoData(res);
      }
        , function (err) {
          // error
        });

          callback(null);
        },
        function (error) {
          //  alert('Facebook login failed: ' + error);
          callback(error);
        });
    }
    // ,downloadUserData: function (callback) {
    //   ngFB.api({ path: '/me' })
    //     .then(function (res) {
    // //     angular.extend(me, res);

   // LocalStorage.setFacebookUserData(res);
    //     callback(null, res);
    //   }
    //     , function (err) {
    //       // error
    //       callback(err);
    //     });
    // } ,
    //  downloadUserPhotoData: function (callback) {
    //   ngFB.api({ path: '/me/picture',
    //     params:{
    //       redirect:false,
    //       height:64,
    //       width:64
    //     } })
    //     .then(function (res) {
   // //     angular.extend(me, {picture:res.data.url});
    //   LocalStorage.setFacebookUserPhotoData(res);
    //     callback(null, res);
    //   }
    //     , function (err) {
    //       // error
    //       callback(err);
    //     });
    // }

  };
})
  .factory('Chats', function () {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

  return {
    all: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
