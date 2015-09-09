  var ipCharts = angular.module('starter.services');
  ipCharts.factory('FBFactory', function (ngFB, LocalStorage) {
  // Defaults to sessionStorage for storing the Facebook token
  ngFB.init({ appId: '880420071993231' }); //real app
// ngFB.init({ appId: '890221411013097' }); //test app
  //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
  //  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});
//console.log("getting data from local storage: "+JSON.stringify(LocalStorage.getFacebookUserData()));

  console.log("init fb factory");
  return {
    login: function (callback) {
      ngFB.login({ scope: 'email,public_profile,user_friends' }).then(
        function (response) {
          console.log("facebook login succesful, response: " + JSON.stringify(response));
          //   alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);

         ///////////////////getting user data
        ngFB.api({ path: '/me' })
        .then(function (res) {
     LocalStorage.setFacebookUserData(res);
      }
        , function (err) {
          // error
        });
        //////////// getting user photo data
        ngFB.api({ path: '/me/picture',
        params:{
          redirect:false,
          height:64,
          width:64
        } })
        .then(function (res) {
      LocalStorage.setFacebookUserPhotoData(res);
      }
        , function (err) {
          // error
        });

          callback(null);
        },
        function (error) {
          //  alert('Facebook login failed: ' + error);
          callback(error);
        });
    },
    getEvents:function(userId, callback)
    {
         //////////// getting user photo data
        ngFB.api({ path: '/me/taggable_friends' // not usable in real app (non fb protocol)
       //  ngFB.api({ path: '/me/friends'
         // , params:{
        //   redirect:false,
        //   height:64,
        //   width:64
        // }
         })
        .then(function (res) {
        callback(null,res);
      }
        , function (err) {
          // error
          callback(err);
        });
    }
  };
});