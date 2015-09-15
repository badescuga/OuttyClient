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
    //  socket.emit('init', {});
    // socket.on('init', function (data) {
    //  console.log('on init --- from server');
    //  });
    ///////////////////

    var _onMessageReceivedHandler = [];

    socket.on('reconnect_attempt', function (data) {
      console.log('on reconnect_attempt ' + JSON.stringify(data));
    });

    socket.on('reconnect_error', function (data) {
      console.error('on reconnect_error ' + JSON.stringify(data));
    });

    socket.on('reconnect_failed', function (data) {
      console.error('on reconnect_failed ' + JSON.stringify(data));
    });

    socket.on('reconnect', function (data) {
      console.log('on reconnect ' + JSON.stringify(data));
    });

    socket.on('disconnect', function (data) {
      console.error('on disconnect ' + JSON.stringify(data));
    });

    socket.on('error', function (data) {
      console.error('on error ' + JSON.stringify(data));
    });

    socket.on('connect', function () {
      console.log('on connect');
    });

    socket.on('receivedMessage', function (data) {
      console.log('received message!: ' + JSON.stringify(data));
      if (_onMessageReceivedHandler.length > 0) {
        _onMessageReceivedHandler.forEach(function (item) {
          item(data);
        });
      }
    });

    return {
      addMessageReceivedHandler: function (callback) {
        _onMessageReceivedHandler.push(callback);
        console.log("!!!!!!!!!!!!!!!!!!!! no. of received message handlers: " + _onMessageReceivedHandler.length);
      },
      login: function (data, callback) {
        socket.emit('login', data, function (error, response) {
          callback(error, response);
        });
      },
      sendMessage: function (data, callback) {
        socket.emit('sendMessage', data, function (error, response) {
          callback(error, response);
        });
      },
      createGroup: function (data, callback) {
        socket.emit('createGroup', data, function (error, response) {
          callback(error, response);
        });
      },
      joinGroup: function (data, callback) {
        socket.emit('joinGroup', data, function (error, response) {
          callback(error, response);
        });
      },
      getGroups: function (callback) {
        socket.emit('getGroups', null, function (error, response) {
          callback(error, response);
        });
      },
      getGroupMessages: function (data, callback) {
        socket.emit('getGroupMessages', data, function (error, response) {
          callback(error, response);
        });
      }
    }

  });