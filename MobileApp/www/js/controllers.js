angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $ionicLoading, $compile, $state) {
  /************* scope variables*****************/
  $scope.isPickup = true; //Button toggle flag
  $scope.LocationsSelected = false; //Confirm button Show
  $scope.startLL = null; //To be selected by user
  $scope.endLL = null; //To be selected by user
  $scope.currentLL = null; //Default LL value
  $scope.isPickupSelected = false; //Pickup Selected flag, used for button tick
  $scope.isDestinationSelected = false; //Destination Selected flag, used for button tick
  var searchBox = document.getElementById('searchLocation'); //Search text box
  
  
  /************* update location and flags *****************/
  function UpdateLocation(latLng){
    if($scope.isPickup){
      $scope.startLL = latLng;
    }
    else{
      $scope.endLL = latLng;
    }
    
    if($scope.startLL && $scope.endLL){
      $scope.LocationsSelected = true;
    }
    else{
      $scope.LocationsSelected = false;
    }
    
    $scope.isPickupSelected = $scope.startLL ? true : false;
    $scope.isDestinationSelected = $scope.endLL ? true : false;
    
    $scope.$apply();
  }
  

  /************* get user location *****************/
  //On Mobile
  if(navigator && navigator.geolocation){
    $ionicLoading.show({
      template: 'Finding Your Location...'
    });
    navigator.geolocation.getCurrentPosition(function(position){
      //On geo location found
      $scope.currentLL = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $ionicLoading.hide();
      RenderMap();
    }, function(error){
      //On geo location error
      console.log(error);
    });
  }
  //On Desktop Browser
  else{
    $scope.currentLL = new window.google.maps.LatLng(12.982424, 77.6939336);
    RenderMap();
  }
    
  
  /************* Main Render Map function *****************/
  function RenderMap(){
    
    //Main map options
    var mapOptions = {
      center: $scope.currentLL,
      zoom: 16,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false
    };
    //Bind the Map to div
    var map = new window.google.maps.Map(document.getElementById("mapMain"), mapOptions);
    
    //Update textbox to current location
    UpdateAddress($scope.currentLL);
    
    //Set marker to default location
    var marker = new window.google.maps.Marker({
      position: $scope.currentLL,
      map: map,
      draggable: true,
      title: 'Location',
      icon: 'img/rsz_map-marker-ball-azure-icon.png'
    });
    //Marker drag event
    window.google.maps.event.addListener(marker, 'dragend', function (event) {
      //Update DOM
      UpdateLocation(event.latLng);
      
      //Update the address
      UpdateAddress(event.latLng);
    });
    //On click update marker
    window.google.maps.event.addListener(map, 'click', function(event) {
      marker.setPosition(event.latLng);
      //Update DOM
      UpdateLocation(event.latLng);
      //Update the address
      UpdateAddress(event.latLng);
    });
    
    
    //Set auto complete to txtbox
    var autocomplete = new window.google.maps.places.Autocomplete(searchBox);
    //Auto complete selection event
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      var placeLL = place.geometry.location;
      
      //Update DOM
      UpdateLocation(placeLL);
      
      //Update Pickup marker
      marker.setPosition(placeLL);
      
      //Center map on marker
      map.setCenter(placeLL);
    });
    
    /************* Toggle button *****************/
    $scope.toggleLocation = function(isPickup){
      $scope.isPickup = isPickup;
      if($scope.isPickup){
        marker.setPosition($scope.startLL || $scope.currentLL);
        marker.setIcon('img/rsz_map-marker-ball-azure-icon.png');
      }
      else{
        marker.setPosition($scope.endLL || $scope.currentLL);
        marker.setIcon('img/rsz_1map-marker-ball-pink-icon.png');
      }
      map.setCenter(marker.position);
      UpdateAddress(marker.position);
      //$scope.$apply();
    }
    
    /************* Update Address from position *****************/
    function UpdateAddress(latLng){
      var geocoder = new window.google.maps.Geocoder;
      geocoder.geocode({'location': latLng}, function(results, status) {
        searchBox.value = results[1].formatted_address;
      });
    };
    
  }
  
  /************* Confirm selections *****************/
  $scope.FindCarpool = function(){
    $state.go("app.search", {SL: $scope.startLL.L, SH: $scope.startLL.H, EL: $scope.endLL.L, EH: $scope.endLL.H}, {inherit:false});
  };
})


.controller('SearchCtrl', function($scope, $ionicLoading, $compile, $stateParams, $http, $state) {
  var start = new window.google.maps.LatLng(parseFloat($stateParams.SH), parseFloat($stateParams.SL));
  var end = new window.google.maps.LatLng(parseFloat($stateParams.EH), parseFloat($stateParams.EL));
  $scope.selectedRouteIndex = -1;
  
  var mid = new window.google.maps.LatLng((start.H + end.H) / 2, (start.L + end.L) / 2);
  var latlngbounds = new window.google.maps.LatLngBounds();
  latlngbounds.extend(start);
  latlngbounds.extend(end);
  
  var mapOptions = {
    center: mid,
    zoom: 13,
    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false
  };
  
  var map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
  map.fitBounds(latlngbounds);
  
  var startMarker = new window.google.maps.Marker({
    position: start,
    map: map,
    title: 'Start',
    icon: 'img/rsz_map-marker-ball-azure-icon.png'
  });
  
  var endMarker = new window.google.maps.Marker({
    position: end,
    map: map,
    title: 'End',
    icon: 'img/rsz_1map-marker-ball-pink-icon.png'
  });
  
  //Get from session storage once login page is implemented.
  var authCode ='Bearer ' + window.sessionStorage.getItem("fbAuth");
  //var authCode = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjBkZGQ0Mzg1MmExZTJiMDA0ZDcwNjMiLCJpYXQiOjE0NDM3ODY4MDUsImV4cCI6MTQ0MzgwNDgwNX0.OMSG4q2gDfkUi-PbrgIkNQpx--ErPU7jaFPgRbK9Oe4';
  
  $http.post('http://try2-geo-db.cfapps.io/api/routes/find', 
    {route: [[start.H, start.L], [end.H, end.L]]},//[[12.9177456, 77.6237883], [13.0281729, 77.6621112]]},//
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authCode
      }
    }).then(function(data){
      var carpools = [];
      for(var i=0;i<data.data.length;i++){
        var carpool = data.data[i];
        carpools.push({
          routeReq: carpool.route,
          fbId: carpool.fb.id,
          name: carpool.fb.name,
          profilePic: carpool.fb.picture.data.url,
          mutualFriends: Math.floor(Math.random() * 9 + 1)
        });
      }
      $scope.carpools = carpools;
      
      if($scope.carpools.length > 0){
        $scope.ShowRoute($scope.carpools[0].routeReq, 0);
      }
    }, function(error){
      console.log(error);
    });
    
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
    $scope.ShowRoute = function(routeRequest, index){
      $scope.selectedRouteIndex = index;
      directionsService.route(routeRequest, function(response, status) {
        if (status == window.google.maps.DirectionsStatus.OK) {
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
        }
      });
    }
    
    $scope.ViewFbProfile = function(fbId){
      var fbUrl = 'https://www.facebook.com/' + fbId;
      if(window.cordova){
        var ref =  window.open(fbUrl, '_blank', 'location=yes');
      }
      else{
        window.open(fbUrl,'_blank', 'location=yes');
      }
    }
    
    $scope.SelectRoute = function(carpool){
      $state.go('app.browse', {displayMessage: 'Your carpooling request has been sent to ' + carpool.name, points: 1});
    }
})

.controller('BrowseCtrl', function($scope, $stateParams, $state) {
  $scope.LoginStarted = false;
  $scope.message = $stateParams.displayMessage;
  
  
  
  var scoreFW = new Score({
    persistant:true,
    callback:function(){
      
    },
    levels:
    [                           
      {
        "checkmark": 0,
        "status": "noob",
        "quote": "You're just a little newbie"
      }, 
      {
        "checkmark": 10,
        "status": "champion",
        "quote": "You're halfway there"
      }, 
      {
        "checkmark": 20,
        "status": "legend",
        "quote": "You made it!"
      }
    ]
  });
  
  
  var score = window.localStorage.getItem("Score");
  if(!score){
    score = 10 + ($stateParams.points || 0);
    window.localStorage.setItem("score", "10");
  }
  else{
    score = parseInt(score) + ($stateParams.points || 0);
  }
  
  window.localStorage.setItem("score", "" + score);
  
  scoreFW.set(score);
  
  $scope.scorecard = scoreFW.scorecard();
  
  console.log($scope.scorecard);
   $scope.Start = function(){
     $scope.LoginStarted = true;
     //Login
     
     document.addEventListener("deviceready", loadOAuthPage, false);
  
    function loadOAuthPage() {
      var authOnce = window.localStorage.getItem("AuthOnce");
      var hiddenBrowser = '';
      if(authOnce){
        hiddenBrowser = ',hidden=yes';
      }
      var ref = cordova.InAppBrowser.open('http://try2-geo-db.cfapps.io/auth/facebook',
        '_blank', hiddenBrowser + 'location=no');
      
      ref.addEventListener('loadstart', function(event){
        if(event.url.indexOf('tokenMblApp') > -1){
          ref.close();
          var authCode = event.url.substring(event.url.indexOf("tokenMblApp=") + 12, event.url.indexOf("#_=_"));
          window.sessionStorage.setItem("fbAuth", authCode);
          window.localStorage.setItem("AuthOnce", "true");
          $scope.LoginStarted = false;
          $state.go('app.playlists');
        }
      });
    }
    
  }
  
  $scope.RedeemScreen = function(){
    $state.go('app.playlist', {scorecard: $scope.scorecard});
  }
 
  
  /*Animating functions */
  
   $scope.level = $scope.scorecard.level;
   $scope.totalLevels = $scope.scorecard.totallevels;
   $scope.quote = $scope.scorecard.quote;
   var $el = $(".totalPoints"),
   value = $scope.scorecard.score;
   
   
   $({percentage: 0}).stop(true).animate({percentage: value}, {
        duration : 3000,
        step: function () {
            // percentage with 1 decimal;
            var percentageVal = Math.round(this.percentage * 10) / 10;
            $el.html(percentageVal);
        }
    }).promise().done(function () {
        // hard set the value after animation is done to be
        // sure the value is correct
        $el.html(value);
        
        $('.pointsTab').each(function(){
          var tabVal = parseInt($(this).attr('points'));
           if(tabVal <= parseInt(value)){
             $(this).addClass('activePoint');
           }
        })
        var width = parseInt($scope.scorecard.totalprogress);
        var tt = $('.percentageComplete');
        $(tt).show();
        $(tt).animate({width: width+'%'},2000,function(){
          $(tt).html(width+'% complete');
        });
        
        
    });
  
})

.controller('PlaylistCtrl', function($scope, $stateParams, $state) {
  $scope.scorecard = $stateParams.scorecard;
  $scope.RedeemPoints = function(message, value){
    $state.go('app.browse', {displayMessage: 'You now have ' + message, points: value});
  }
});
