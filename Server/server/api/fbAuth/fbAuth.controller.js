'use strict';

var _ = require('lodash');
var FbAuth = require('./fbAuth.model');

// Get list of fbAuths
exports.index = function(req, res) {
  var options = {
    host: 'graph.facebook.com',
    port: 443,
    path: '/v2.3/oauth/access_token?client_id='+ process.env.FACEBOOK_ID +'&redirect_uri=http://192.168.0.106:9000/auth/facebook/callback&client_secret=ddc2f7e83ccf8d16de89d5eed4fd811b&code={code-parameter}',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  };
};

/*
// Get a single fbAuth
exports.show = function(req, res) {
  FbAuth.findById(req.params.id, function (err, fbAuth) {
    if(err) { return handleError(res, err); }
    if(!fbAuth) { return res.status(404).send('Not Found'); }
    return res.json(fbAuth);
  });
};

// Creates a new fbAuth in the DB.
exports.create = function(req, res) {
  FbAuth.create(req.body, function(err, fbAuth) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(fbAuth);
  });
};

// Updates an existing fbAuth in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  FbAuth.findById(req.params.id, function (err, fbAuth) {
    if (err) { return handleError(res, err); }
    if(!fbAuth) { return res.status(404).send('Not Found'); }
    var updated = _.merge(fbAuth, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(fbAuth);
    });
  });
};

// Deletes a fbAuth from the DB.
exports.destroy = function(req, res) {
  FbAuth.findById(req.params.id, function (err, fbAuth) {
    if(err) { return handleError(res, err); }
    if(!fbAuth) { return res.status(404).send('Not Found'); }
    fbAuth.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};
*/

function handleError(res, err) {
  return res.status(500).send(err);
}