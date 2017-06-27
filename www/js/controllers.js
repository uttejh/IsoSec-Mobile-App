angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('DashCtrl', function($scope,$ionicPopup,$rootScope,$http,$cordovaContacts, $ionicPlatform) {

  $rootScope.apiend = 'http://learnertown.com/uttejh/';

  $scope.visitorshow=false;
  $rootScope.badge=0;
   $scope.visitor = {
      name:"",
      mobile:"",
      number:""
      
    };
    $scope.visitorinform = function(){
      console.log($scope.visitor);
      var alertPopup = $ionicPopup.alert({
                title: 'Unable to establish Connection',
                   //template: 'Alert message'
                });
      $http({
        method:"POST",
        url:$rootScope.apiend+'visitorinform.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $scope.visitor,
      }).success(function(result){
        //$scope.list = result;
        //$rootScope.showloader=false;
        console.log(result);
      });
    }
    
function findContacts() {
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;
   fields = ["displayName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
    
   function contactfindSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
         alert("Display Name = " + contacts[i].displayName);
      }
   }
  
   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
  
}
    $scope.visitorinform2 = function(x){
      console.log(x);
      var alertPopup = $ionicPopup.confirm({
         title: 'Are you sure about the <b>'+x+'</b>?',
         buttons:[{text:'Yes',type: 'button-positive',onTap: function(e){
            var alertPopup = $ionicPopup.alert({
                title: 'Unable to establish Connection',
                   //template: 'Alert message'
                });
            $http({
            method:"POST",
            url:$rootScope.apiend+'visitorinform2.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {type:x},
          }).success(function(result){
            //$scope.list = result;
            //$rootScope.showloader=false;
            console.log(result);
            var alertPopup = $ionicPopup.alert({
                title: 'The Security Center has been notified about the <b>'+x+'</b>',
                   //template: 'Alert message'
                });
             // }},{text:'cancel'}]
          });

          // var alertPopup = $ionicPopup.alert({
          //   title: 'The Security Center has been notified about the <b>Delivery Guy</b>',
          //      //template: 'Alert message'
          //   });
         }},{text:'cancel'}]
         //template: 'Alert message'
      });


     }   
     

    $scope.findContacts=function(){
        var options = new ContactFindOptions();
     options.filter = "bob";
     options.multiple = true;
     fields = ["displayName"];
     navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
      console.log('iui');
     function contactfindSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
           console.log("Display Name = " + contacts[i].displayName);
        }
     }
    
     function contactfindError(message) {
        console.log('Failed because: ' + message);
     }
    
  }


    $scope.flat=1;
    $http({
            method:"POST",
            url:'http://learnertown.com/uttejh/visitorshow.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:{flat:$scope.flat},
          }).success(function(result){
            //$scope.list = result;
            //$rootScope.showloader=false;
            //$scope.myvis=result;
            $rootScope.badge=result.length;
            //console.log(result.length);
            
          });

})

.controller('ChatsCtrl', function($scope,$http,$rootScope,$ionicPopup) {
  
          $scope.flat=1;
          $scope.myvis="";
          $http({
            method:"POST",
            url:'http://learnertown.com/uttejh/visitorshow.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:{flat:$scope.flat},
          }).success(function(result){
            //$scope.list = result;
            //$rootScope.showloader=false;
            $scope.myvis=result;
            $rootScope.badge=result.length;
            console.log(result);
            
          });

          $scope.disable=function(x){
            var alertPopup = $ionicPopup.confirm({
               title: 'DO you want to Disable Permission for <b>'+x.type+'-'+x.name+'</b> ?',
               buttons:[{text:'Yes',type: 'button-positive',onTap: function(e){

                  $http({
                  method:"POST",
                  url:'http://localhost:8012/uttejh/excite/visdel.php',
                  //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  data: {data:x},
                }).success(function(result){
                  //$scope.list = result;
                  //$rootScope.showloader=false;
                  console.log(result);
                  var alertPopup = $ionicPopup.alert({
                      title: 'The Security Center has been notified about the <b>'+x.type+'</b>',
                         //template: 'Alert message'
                      });
                   // }},{text:'cancel'}]
                });

                // var alertPopup = $ionicPopup.alert({
                //   title: 'The Security Center has been notified about the <b>Delivery Guy</b>',
                //      //template: 'Alert message'
                //   });
               }},{text:'cancel'}]
               //template: 'Alert message'
            });
          }

          $scope.doRefresh=function() {
            console.log('Begin async operation');
            $http({
            method:"POST",
            url:'http://localhost:8012/uttejh/excite/visitorshow.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:{flat:$scope.flat},
          }).success(function(result){
            //$scope.list = result;
            //$rootScope.showloader=false;
            $scope.myvis=result;
            $rootScope.badge=result.length;
            console.log(result);
            
          });$scope.$broadcast('scroll.refreshComplete');
            setTimeout(() => {
              console.log('Async operation has ended');
              //refresher.complete();
            }, 2000);
          }
})

.controller('ChatDetailCtrl', function($scope) {
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
