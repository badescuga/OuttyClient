/* global angular */
angular.module('starter.controllers', [])

  .controller('LoginCtrl', function ($scope, $state, FBFactory, LocalStorage, RequestManager, _) {
    //  $scope.chat = Chats.get($stateParams.chatId);
    //alert('LOGIN CTRL');
    console.log('---  in LoginCTRL');
    //           $state.go('tab.dash'); //temp hack

    if (LocalStorage.getFacebookUserData() != null) {
      $state.go('tab.dash');
    } else {
      console.log("user is not logged in -- ");
    }

    $scope.fbLogin = function () {
      FBFactory.login(function (error) {
        if (!error) {
          RequestManager.initData(true);
          // console.log("fb login succesful");
          // //starting login
          // var fbUserData = LocalStorage.getFacebookUserData();
          // var fbUserPhotoData = LocalStorage.getFacebookUserPhotoData();

          // console.log('!!! ' + JSON.stringify(fbUserData) + ' ' + JSON.stringify(fbUserPhotoData));

          // var data = {};
          // data.fbId = fbUserData.id;
          // data.fbName = fbUserData.name;
          // data.fbPhotoPath = fbUserPhotoData.data.url;
          // console.log('sending to server: ' + JSON.stringify(data));
          // RequestManager.login(data, _.bind(function (error, response) {
          //   console.log('response from server on login(controllers.js): ' + JSON.stringify(error) + ' ' + JSON.stringify(response));
          //   LocalStorage.setUserId(response.userId);
          //   $state.go('tab.dash');
          // }));

        } else {
          console.log('fb login failed: ' + JSON.stringify(error));
        }
      });
    };
  })

  .controller('DashCtrl', function ($scope, RequestManager, LocalStorage) {


    // //login
    // var fbUserData = LocalStorage.getFacebookUserData();
    // var fbUserPhotoData = LocalStorage.getFacebookUserPhotoData();
    // var data = {};
    // data.fbId = fbUserData.id;
    // data.fbName = fbUserData.name;
    // data.fbPhotoPath = fbUserPhotoData.data.url;
    // console.log('sending to server: ' + JSON.stringify(data));
    // RequestManager.login(data, function (error, response) {
    //   console.log('response from server on login: ' + JSON.stringify(error) + ' ' + JSON.stringify(response));
    //   LocalStorage.setUserId(response.userId);
    // });

  })

  .controller('ChatDetailCtrl', ['$scope', '$rootScope', '$ionicSideMenuDelegate', '$state',
    '$stateParams', '$ionicActionSheet',
    '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval',
    'socketFactory', 'RequestManager', '_', 'LocalStorage',
    function ($scope, $rootScope, $ionicSideMenuDelegate, $state, $stateParams, $ionicActionSheet,
      $ionicPopup, $ionicScrollDelegate, $timeout, $interval, socketFactory, RequestManager, _, LocalStorage) {


      var initData = LocalStorage.getInitData();

      $scope.toggleRight = function () {
        console.log('toggleRight -- ');
        $ionicSideMenuDelegate.toggleRight();
      };

      $scope.getUserData = function (userId) {
        var usersDetails = initData.usersCompleteData;
        var rslt = (usersDetails[userId] != null ? usersDetails[userId] : userId);
        //     console.log('==>>> '+JSON.stringify(rslt));
        return rslt;
      }

      // mock acquiring data via $stateParams badescuga
      $scope.Group = {
        _id: $stateParams.chatId,
        name: initData.groupsDetailedData[$stateParams.chatId].name._
      }

      // this could be on $rootScope rather than in $stateParams
      $scope.user = {
        _id: LocalStorage.getUserId(),
        pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
        username: 'Me'
      };


      // $scope.toUser = {
      //   _id: '534b8e5aaa5e7afc1b23e69b',
      //   pic: 'http://ionicframework.com/img/docs/venkman.jpg',
      //   username: 'Venkman'
      // }


      //$scope.input = {
      //  message: localStorage['userMessage-' + $scope.Group._id] || ''
      //};

      var messageCheckTimer;

      var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
      var footerBar; // gets set in $ionicView.enter
      var scroller;
      var txtInput; // ^^^

      $scope.$on('$ionicView.enter', function () {
        console.log('UserMessages $ionicView.enter');

        //event handler for new message received

        // $scope.messages = {};
        socketFactory.addMessageReceivedHandler(_.bind(function (message) {
          console.log('adding message ' + JSON.stringify(message));
          $scope.messages.push(message);
          keepKeyboardOpen();
          viewScroll.scrollBottom(true);
        }));

        //join the backend chat
        console.log('joining chat');
        var data = { groupId: $stateParams.chatId };
        RequestManager.joinGroup(data, function (error, response) {
          console.log('joined group :' + JSON.stringify(error) + ", " + JSON.stringify(response));
        });

        //  getMessages();

        //badescuga
        getMessages2();

        $timeout(function () {
          footerBar = document.body.querySelector('#chat-detail .bar-footer');
          scroller = document.body.querySelector('#chat-detail .scroll-content');
          txtInput = angular.element(footerBar.querySelector('textarea'));
        }, 0);

        messageCheckTimer = $interval(function () {
          // here you could check for new messages if your app doesn't use push notifications or user disabled them
        }, 20000);
      });

      $scope.$on('$ionicView.leave', function () {
        console.log('leaving UserMessages view, destroying interval');
        // Make sure that the interval is destroyed
        if (angular.isDefined(messageCheckTimer)) {
          $interval.cancel(messageCheckTimer);
          messageCheckTimer = undefined;
        }
      });

      $scope.$on('$ionicView.beforeLeave', function () {
        //   if (!$scope.input.message || $scope.input.message === '') {
        //     localStorage.removeItem('userMessage-' + $scope.toUser._id);
        //   }
      });

      // function getMessages() {
      //   // the service is mock but you would probably pass the toUser's GUID here
      //   MockService.getUserMessages({
      //     toUserId: $scope.toUser._id
      //   }).then(function (data) {
      //     $scope.doneLoading = true;
      //     $scope.messages = data.messages;

      //     $timeout(function () {
      //       viewScroll.scrollBottom();
      //     }, 0);
      //   });
      // }

      //badescuga get messages
      function getMessages2() {
        var data = {};
        data.groupId = $scope.Group._id;
        RequestManager.getGroupMessages(data, function (error, response) {
          if (error) {
            alert('error! ' + JSON.stringify(error));
          } else {
            console.log(' retrieved messages ' + JSON.stringify(response));
            $scope.doneLoading = true;
            $scope.messages = response.entries;

            $timeout(function () {
              viewScroll.scrollBottom();
            }, 0);
            //response = {"entries":[],"continuationToken":null}
          }

        });
        // the service is mock but you would probably pass the toUser's GUID here
        // MockService.getUserMessages({
        //   toUserId: $scope.toUser._id
        // }).then(function (data) {
        //   $scope.doneLoading = true;
        //   $scope.messages = data.messages;

        //   $timeout(function () {
        //     viewScroll.scrollBottom();
        //   }, 0);
        // });
      }

      $scope.$watch('input.message', function (newValue, oldValue) {
        console.log('input.message $watch, newValue ' + newValue);
        // if (!newValue) newValue = '';
        // localStorage['userMessage-' + $scope.Group._id] = newValue;
      });

      $scope.sendMessage = function (sendMessageForm) {
        // var message = {
        //   toId: $scope.toUser._id,
        //   text: $scope.input.message
        // };
        var message = {
          groupId: $scope.Group._id,
          message: $scope.input.message,
          type: 'text'
        };

        // if you do a web service call this will be needed as well as before the viewScroll calls
        // you can't see the effect of this in the browser it needs to be used on a real device
        // for some reason the one time blur event is not firing in the browser but does on devices
        keepKeyboardOpen();

        //////// badescuga
        // //MockService.sendMessage(message).then(function(data) {
        // $scope.input.message = '';

        // message._id = new Date().getTime(); // :~)
        // message.date = new Date();
        // message.username = $scope.user.username;
        // message.userId = $scope.user._id;
        // message.pic = $scope.user.picture;

        // $scope.messages.push(message);

        // $timeout(function () {
        //   keepKeyboardOpen();
        //   viewScroll.scrollBottom(true);
        // }, 0);

        // $timeout(function () {
        //   $scope.messages.push(MockService.getMockMessage());
        //   keepKeyboardOpen();
        //   viewScroll.scrollBottom(true);
        // }, 2000);

        // //});

        RequestManager.sendMessage(message, function (error, response) {
          $scope.input.message = '';

          // message._id = response.RowKey._;
          // message.date = response.Timestamp._;
          // message.username = response.userId._;
          // message.userId = response.userId._;
          // message.pic = response.fbPhotoPath._;

          // $scope.messages.push(message);

          // $timeout(function () {
          //   keepKeyboardOpen();
          //   viewScroll.scrollBottom(true);
          // }, 0);

          // $timeout(function () {
          //   $scope.messages.push(MockService.getMockMessage());
          //   keepKeyboardOpen();
          //   viewScroll.scrollBottom(true);
          // }, 2000);

        });
      };

      // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
      function keepKeyboardOpen() {
        console.log('keepKeyboardOpen');
        txtInput.one('blur', function () {
          console.log('textarea blur, focus back on it');
          txtInput[0].focus();
        });
      }

      $scope.onMessageHold = function (e, itemIndex, message) {
        console.log('onMessageHold');
        console.log('message: ' + JSON.stringify(message, null, 2));
        $ionicActionSheet.show({
          buttons: [{
            text: 'Copy Text'
          }, {
              text: 'Delete Message'
            }],
          buttonClicked: function (index) {
            switch (index) {
              case 0: // Copy Text
                //cordova.plugins.clipboard.copy(message.text);

                break;
              case 1: // Delete
                // no server side secrets here :~)
                $scope.messages.splice(itemIndex, 1);
                $timeout(function () {
                  viewScroll.resize();
                }, 0);

                break;
            }

            return true;
          }
        });
      };

      // this prob seems weird here but I have reasons for this in my app, secret!
      $scope.viewProfile = function (msg) {
        if (msg.userId === $scope.user._id) {
          // go to your profile
        } else {
          // go to other users profile
        }
      };

      // I emit this event from the monospaced.elastic directive, read line 480
      $scope.$on('taResize', function (e, ta) {
        console.log('taResize');
        if (!ta) return;

        var taHeight = ta[0].offsetHeight;
        console.log('taHeight: ' + taHeight);

        if (!footerBar) return;

        var newFooterHeight = taHeight + 10;
        newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

        footerBar.style.height = newFooterHeight + 'px';
        scroller.style.bottom = newFooterHeight + 'px';
      });

    }])
  .controller('ChatsCtrl', function ($scope, Chats, FBFactory, LocalStorage, RequestManager, _) {


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
    $scope.$on('$ionicView.enter', function (e) {

      //loading chats views
      RequestManager.getGroups(function (error, response) {
        if (!error) {
          //     console.log('aaa7777 '+JSON.stringify(response));
          var groups = response;
          var chats = [];
          var initData = LocalStorage.getInitData();


          groups.forEach(function (item) {
            var chat = {};
            chat.id = item.PartitionKey._;
            chat.name = initData.groupsDetailedData[chat.id].name._;
            chat.lastText = "no last text";
            chat.face = "https://avatars3.githubusercontent.com/u/11214?v=3&s=460";

            chats.push(chat);
          });
          console.log('chats ' + JSON.stringify(chats));
          $scope.chats = chats;
        } else {
          console.log('error: ' + JSON.stringify(error));
        }
      });
    });

    $scope.remove = function (chat) {

      var self = this;
      //send to server to remove user
      RequestManager.removeUserFromGroup({ groupId: chat.id }, function (error, resp) {
        if (error) {
          alert('eroare : ' + JSON.stringify(error));
        } else {
          console.log(' user removed from chat! yey! ' + JSON.stringify(resp));
          //remove chat
          var id = $scope.chats.indexOf(chat);
          $scope.chats.splice(id, 1);
        }
      });

    };
  })

//   .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

  .controller('AccountCtrl', function ($scope, LocalStorage, RequestManager) {
    //  alert('daaaaa');
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('NewChatCtrl', function ($scope, RequestManager) {
    console.log('in new chat ctrl');

    $scope.createGroup = function () {
      console.log("!!!!!!!!!!!!!!!!! " + $scope.createGroup.groupName);
      var data = { name: $scope.createGroup.groupName };
      RequestManager.createGroup(data, function (error, response) {
        console.log('created group :' + JSON.stringify(error) + " " + JSON.stringify(response));
      });
    }
  });