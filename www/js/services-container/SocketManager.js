 var ipCharts = angular.module('starter.services');
 ipCharts.factory('socket', function ($rootScope) {
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
 
});