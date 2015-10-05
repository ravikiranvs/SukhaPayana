'use strict';

var _ = require('lodash');
var Coodroute = require('./coodroute.model');

// Get list of coodroutes
exports.index = function(req, res) {
  Coodroute.find(function (err, coodroutes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(coodroutes);
  });
};

// Get a single coodroute
exports.show = function(req, res) {
  Coodroute.findById(req.params.id, function (err, coodroute) {
    if(err) { return handleError(res, err); }
    if(!coodroute) { return res.status(404).send('Not Found'); }
    return res.json(coodroute);
  });
};

// Creates a new coodroute in the DB.
exports.create = function(req, res) {
  Coodroute.create(req.body, function(err, coodroute) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(coodroute);
  });
};

// Updates an existing coodroute in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Coodroute.findById(req.params.id, function (err, coodroute) {
    if (err) { return handleError(res, err); }
    if(!coodroute) { return res.status(404).send('Not Found'); }
    var updated = _.merge(coodroute, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(coodroute);
    });
  });
};

// Deletes a coodroute from the DB.
exports.destroy = function(req, res) {
  Coodroute.findById(req.params.id, function (err, coodroute) {
    if(err) { return handleError(res, err); }
    if(!coodroute) { return res.status(404).send('Not Found'); }
    coodroute.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}