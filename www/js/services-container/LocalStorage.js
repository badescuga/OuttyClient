 var ipCharts = angular.module('starter.services');
 ipCharts.factory('LocalStorage', function () {
  return {
    setUserId: function (data) {
      window.localStorage.setItem('userId', JSON.stringify(data));
    },
     getUserId: function (data) {
     return JSON.parse(window.localStorage.getItem('userId'));
    }
    ,
    setFacebookUserData: function (data) {
      window.localStorage.setItem('facebookData', JSON.stringify(data));
    }
    ,
     getFacebookUserData: function (data) {
     return JSON.parse(window.localStorage.getItem('facebookData'));
    }
    ,
    setFacebookUserPhotoData: function (data) {
      window.localStorage.setItem('facebookPhotoData', JSON.stringify(data));
    },
     getFacebookUserPhotoData: function (data) {
    return JSON.parse(window.localStorage.getItem('facebookPhotoData'));
    }

  }
});