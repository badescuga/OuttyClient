/* global angular */
var ipCharts = angular.module('starter.services');
ipCharts.factory('RequestManager', function (socketFactory) {
  return {
    login: function (data, callback) {
      __login(socketFactory, data, callback);
    },
    createGroup: function (data, callback) {
      _createGroup(socketFactory, data, callback);
    },
      joinGroup: function (data, callback) {
      _joinGroup(socketFactory, data, callback);
    },
    getGroups: function (callback) {
      _getGroups(socketFactory, callback);
    },
      sendMessage: function (callback) {
      _sendMessage(socketFactory, callback);
    },
    getGroupMessages: function (data, callback) {
      _getGroupMessages(socketFactory, data, callback);
    },
    getUsersInfoFromChats: function(data, callback) {
     __getUsersInfoFromChats(socketFactory, data, callback);
    },
    initData: function(goToDashboard) {
      socketFactory.initData(goToDashboard);
    }
  }
});

function __login(socketFactory, data, callback) {
  socketFactory.login(data, function (error,response) {
    console.log('response from server on login: '+ JSON.stringify(error)+" " + JSON.stringify(response));
    if (callback) {
      callback(error, response);
    }
  });
}

function __getUsersInfoFromChats(socketFactory, data, callback) {
  socketFactory.getUsersInfoFromChats(data, function (error,response) {
    console.log('response from server on get users info from chats: '+ JSON.stringify(error)+" " + JSON.stringify(response));
    if (callback) {
      callback(error, response);
    }
  });
}

function _createGroup(socketFactory, data, callback) {
  socketFactory.createGroup(data, function (error,response) {
    console.log('response from server on createGroup: '+ JSON.stringify(error)+" " + JSON.stringify(response));
    if (callback) {
      callback(error, response);
    }
  });
}

function _sendMessage(socketFactory, data, callback) {
  socketFactory.sendMessage(data, function (error, response) {
    console.log('response from server on sendMessage: '+ JSON.stringify(error)+" " + JSON.stringify(response));
    if (callback) {
      callback(error, response);
    }
  });
}

function _joinGroup(socketFactory, data, callback) {
  socketFactory.joinGroup(data, function (error, response) {
    console.log('response from server on joinGroup: '+ JSON.stringify(error)+" " + JSON.stringify(response));
    if (callback) {
      callback(error, response);
    }
  });
}

function _getGroups(socketFactory, callback) {
  socketFactory.getGroups(function (error, response) {
    console.log('response from server on getGroups: ' + JSON.stringify(error)+" " + JSON.stringify(response));
    if (callback) {
      callback(error, response);
    }
  });
}

function _getGroupMessages(socketFactory, data, callback) {
  socketFactory.getGroupMessages(data, function (error, response) {
    console.log('response from server on getGroupMessages: ' + JSON.stringify(error)+" " + JSON.stringify(response));
    if (callback) {
      callback(error, response);
    }
  });
}
