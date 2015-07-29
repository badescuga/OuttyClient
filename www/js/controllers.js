/* global angular */
angular.module('starter.controllers', [])

  .controller('LoginCtrl', function($scope, $state, socketFactory, FBFactory, LocalStorage,testFactory) {
  //  $scope.chat = Chats.get($stateParams.chatId);
  //alert('LOGIN CTRL');
 console.log('---  in LoginCTRL, test factory '+testFactory.testVal);
 
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
  
  .controller('DashCtrl', function($scope) { })

  .controller('ChatsCtrl', function($scope, Chats) {
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
