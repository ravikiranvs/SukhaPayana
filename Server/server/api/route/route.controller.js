'use strict';

var _ = require('lodash');
var Route = require('./route.model');
var FB = require('fb');
var Users = require('../user/user.model');
var Q = require('q');

// Get list of routes
exports.index = function(req, res) {
  Route.find(function (err, routes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(routes);
  });
};

// Get a single route
exports.show = function(req, res) {
  Route.findById(req.params.id, function (err, route) {
    if(err) { return handleError(res, err); }
    if(!route) { return res.status(404).send('Not Found'); }
    return res.json(route);
  });
};

// Creates a new route in the DB.
exports.create = function(req, res) {
  Route.create(req.body, function(err, route) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(route);
  });
};

// Updates an existing route in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Route.findById(req.params.id, function (err, route) {
    if (err) { return handleError(res, err); }
    if(!route) { return res.status(404).send('Not Found'); }
    var updated = _.merge(route, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(route);
    });
  });
};

// Deletes a route from the DB.
exports.destroy = function(req, res) {
  Route.findById(req.params.id, function (err, route) {
    if(err) { return handleError(res, err); }
    if(!route) { return res.status(404).send('Not Found'); }
    route.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

//Find routes for start and end positions.
exports.find = function(req, res){
  var query = Route.find();
  var wayPoints = req.body.route;
  for(var i = 0; i < wayPoints.length; i++){
    query = query.where('Route').near({ center: {type: 'Point', coordinates: wayPoints[i] }, maxDistance: 500, spherical: true });
  }
  
  query.exec(function(err, routes){
    if(err) { return handleError(res, err); }
    
    function FindUser(cpw, FBID){
      var deferred = Q.defer();
      console.log('FBID: ' + FBID);
      Users.findOne({'facebook.id': FBID}, function(err, user){
        if(err) deferred.reject(err);
        cpw.fbAccessToken = user._doc.accessToken;
        deferred.resolve(cpw);
      });
      return deferred.promise;
    }
    
    function GetProfileFromUser(cpw){
      var deferred = Q.defer();
        FB.api('me', { fields: ['id', 'name', 'picture'], access_token: cpw.fbAccessToken }, function(profile){
          cpw.carpool.fb = profile;
          deferred.resolve(cpw);
        });
        return deferred.promise;
    }
      
    var promises = [];
    for(var i = 0; i < routes.length; i++){
      var route = routes[i];
      var carpoolWrapper = {
        carpool: {
          route: route.GoogleRouteReq,
          fb: {}
        }
      }
      
      promises.push(FindUser(carpoolWrapper, route.FBID).then(GetProfileFromUser));
    }
    
    Q.all(promises).then(function(carpoolWrappers){
      var carpools = [];
      for(var i = 0; i < carpoolWrappers.length; i++){
        carpools.push(carpoolWrappers[i].carpool);
      }
    
      
      return res.status(200).json(carpools);
    });
  });
      
      
      
      
      
      
      /*var Carpools = [];
      FB.api('me', { fields: ['id', 'name', 'picture'], access_token: req.user._doc.accessToken }, function (profile) {
        var carpool;
        for(var i = 0; i < routes.length; i++){
          carpool = routes[i];
          Carpools.push({
            route: carpool.GoogleRouteReq,
            fb: profile
          })
        }
        
        return res.status(200).json(Carpools);
      });*/
};

function handleError(res, err) {
  return res.status(500).send(err);
}