var ipCharts = angular.module('starter.services');
ipCharts.factory('RequestManager', function (socketFactory) {
  return {
    login: function (data, callback) {
      socketFactory.login(data, function (response) {
        console.log('response from server on login: ' + JSON.stringify(response));
        if (callback) {
          callback(response);
        }
      });
    }
  }
});