/* global angular */
var ipCharts = angular.module('starter.services');
ipCharts.factory('RequestManager', function (socketFactory) {
  return {
    login: function (data, callback) {
      _login(socketFactory, data, callback);
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
    getGroupMessages: function (data, callback) {
      _getGroupMessages(socketFactory, data, callback);
    }
  }
});

function _login(socketFactory, data, callback) {
  socketFactory.login(data, function (response) {
    console.log('response from server on login: ' + JSON.stringify(response));
    if (callback) {
      callback(response);
    }
  });
}

function _createGroup(socketFactory, data, callback) {
  socketFactory.createGroup(data, function (response) {
    console.log('response from server on createGroup: ' + JSON.stringify(response));
    if (callback) {
      callback(response);
    }
  });
}

function _joinGroup(socketFactory, data, callback) {
  socketFactory.joinGroup(data, function (response) {
    console.log('response from server on joinGroup: ' + JSON.stringify(response));
    if (callback) {
      callback(response);
    }
  });
}

function _getGroups(socketFactory, callback) {
  socketFactory.getGroups(function (response) {
    console.log('response from server on getGroups: ' + JSON.stringify(response));
    if (callback) {
      callback(response);
    }
  });
}

function _getGroupMessages(socketFactory, data, callback) {
  socketFactory.getGroupMessages(data, function (response) {
    console.log('response from server on getGroupMessages: ' + JSON.stringify(response));
    if (callback) {
      callback(response);
    }
  });
}
