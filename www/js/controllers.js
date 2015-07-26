/* global angular */
angular.module('starter.controllers', [])

  .controller('LoginCtrl', function ($scope, $state, FBFactory, LocalStorage) {
  //  $scope.chat = Chats.get($stateParams.chatId);
  //alert('LOGIN CTRL');
  console.log('--- got FBFactory --- testVal = ' + FBFactory.testVal);

  if (LocalStorage.getFacebookUserData() != null) {
    console.log("-------->>>> " + LocalStorage.getFacebookUserData.id);
    $state.go('tab.dash');
  } else {
    console.log("user is not logged in -- ");
  }

  $scope.fbLogin = function () {
    FBFactory.login(function (error) {
      if (!error) {
        console.log("login succesful");
        $state.go('tab.dash');
        // FBFactory.downloadUserData(function (error, response) {
        //   console.log('user data ' + JSON.stringify(response));
        // });

        // FBFactory.downloadUserPhotoData(function (error, response) {
        //   console.log('user photo ' + JSON.stringify(response));
        // });
      } else {
        console.log('login failed: ' + error);
      }
    });

  };
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
