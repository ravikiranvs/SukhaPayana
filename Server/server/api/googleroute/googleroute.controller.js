'use strict';

var _ = require('lodash');
var Googleroute = require('./googleroute.model');
var Coodroute = require('../coodroute/coodroute.model');
var polyline = require('polyline');

// Get list of googleroutes
exports.index = function(req, res) {
  Googleroute.find(function (err, googleroutes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(googleroutes);
  });
};

// Get a single googleroute
exports.show = function(req, res) {
  Googleroute.findById(req.params.id, function (err, googleroute) {
    if(err) { return handleError(res, err); }
    if(!googleroute) { return res.status(404).send('Not Found'); }
    return res.json(googleroute);
  });
};

// Creates a new googleroute in the DB.
exports.create = function(req, res) {
  Googleroute.create(req.body, function(err, googleroute) {
    if(err) { return handleError(res, err); }
    
    var coods = polyline.decode(googleroute.route); 
    Coodroute.create({'googleroute': googleroute._id, route: {type: 'LineString', coordinates: coods}}, function(err, coodroute){
      if(err) { return handleError(res, err); }
      return res.status(201).json(googleroute);
    });
  });
};

// Updates an existing googleroute in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Googleroute.findById(req.params.id, function (err, googleroute) {
    if (err) { return handleError(res, err); }
    if(!googleroute) { return res.status(404).send('Not Found'); }
    var updated = _.merge(googleroute, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(googleroute);
    });
  });
};

// Deletes a googleroute from the DB.
exports.destroy = function(req, res) {
  Googleroute.findById(req.params.id, function (err, googleroute) {
    if(err) { return handleError(res, err); }
    if(!googleroute) { return res.status(404).send('Not Found'); }
    googleroute.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

//Find routes for start and end positions.
exports.find = function(req, res){
  var query = Coodroute.find();
  query.where('route').near({ center: {type: 'Point', coordinates: req.body.startLOC }, maxDistance: 500, spherical: true })
    .where('route').near({ center: {type: 'Point', coordinates: req.body.endLOC }, maxDistance: 500, spherical: true })
    .exec(function(err, coodroutes){
      if(err) { return handleError(res, err); }
      var subQuery = Googleroute.find();
      for(var i = 0; i < coodroutes.length; i++){
        subQuery = subQuery.or('_id').eq(coodroutes[i].googleroute);
      }
      subQuery.exec(function(err, googleroutes){
        if(err) { return handleError(res, err); }
        return res.status(200).json(googleroutes);
      });
      
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}