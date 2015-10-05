'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RouteSchema = new Schema({
  FBID: String,
  GoogleRouteReq: {},
  polyline: String,
  Route: {}
});

RouteSchema.index({Route: '2dsphere'});

module.exports = mongoose.model('Route', RouteSchema);