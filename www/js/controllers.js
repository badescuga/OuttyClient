/* global angular */
angular.module('starter.controllers', [])

  .controller('LoginCtrl', function ($scope, FBFactory) {
  //  $scope.chat = Chats.get($stateParams.chatId);
  //alert('LOGIN CTRL');
  console.log('--- got FBFactory --- testVal = ' + FBFactory.testVal);
  FBFactory.login(function (error) {
    if (!error) {
      console.log("login succesful");
      FBFactory.getUser(function (error, response) {
        console.log('user data ' + JSON.stringify(response));
      });

      FBFactory.getUserPhoto(function (error, response) {
        console.log('user photo ' + JSON.stringify(response));
      });


    } else {
      console.log('login failed: ' + error);
    }
  }
    );
})

  .controller('DashCtrl', function ($scope) { })

  .controller('ChatsCtrl', function ($scope, Chats) {
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
