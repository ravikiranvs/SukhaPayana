'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CoodrouteSchema = new Schema({
  googleroute: String,
  route: {}
});

CoodrouteSchema.index({route: '2dsphere'});

module.exports = mongoose.model('Coodroute', CoodrouteSchema);