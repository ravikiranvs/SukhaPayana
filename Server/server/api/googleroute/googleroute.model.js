'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GooglerouteSchema = new Schema({
  driver: String,
  route: String,
  time: Date
});

module.exports = mongoose.model('Googleroute', GooglerouteSchema);