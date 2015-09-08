/* global angular */
angular.module('starter.controllers', [])

  .controller('LoginCtrl', function($scope, $state, FBFactory, LocalStorage) {
  //  $scope.chat = Chats.get($stateParams.chatId);
  //alert('LOGIN CTRL');
 console.log('---  in LoginCTRL');

  if (LocalStorage.getFacebookUserData() != null) {
            $state.go('tab.dash');
  } else {
    console.log("user is not logged in -- ");
  }

  $scope.fbLogin = function () {
    FBFactory.login(function(error) {
      if (!error) {
        console.log("fb login succesful");
        $state.go('tab.dash');
      } else {
        console.log('fb login failed: ' + error);
      }
    });
  };
})

  .controller('DashCtrl', function($scope, socketFactory, LocalStorage) {

    //login
    var data = {};
    data.userLoginData = LocalStorage.getFacebookUserData();
    data.userPhotoData = LocalStorage.getFacebookUserPhotoData();
    console.log('sending to server: '+JSON.stringify(data));
    socketFactory.login(data, function(response)
      {
        console.log('response from server on login: '+  JSON.stringify(response));
      });

   })
     .controller('CurrentChatCtrl', function($scope, Chats, FBFactory) {
    // FBFactory.getEvents('10153152163398402',function(err, data)
    //   {
    //     if(err)
    //     {
    //       console.error("error get events: " + JSON.stringify(err));
    //     } else {
    //     console.log('events: '+JSON.stringify(data));
    //     }
    //   }
    //  )

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  }
})


  .controller('ChatsCtrl', function($scope, Chats, FBFactory) {
    // FBFactory.getEvents('10153152163398402',function(err, data)
    //   {
    //     if(err)
    //     {
    //       console.error("error get events: " + JSON.stringify(err));
    //     } else {
    //     console.log('events: '+JSON.stringify(data));
    //     }
    //   }
    //  )

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  }
})

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

  .controller('AccountCtrl', function ($scope) {
  //  alert('daaaaa');
  $scope.settings = {
    enableFriends: true
  };
});
