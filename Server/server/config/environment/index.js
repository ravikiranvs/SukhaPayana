'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'try-geo-spatial-db-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || '1907988879426172',//'914646915238923',
    clientSecret: process.env.FACEBOOK_SECRET || 'ddc2f7e83ccf8d16de89d5eed4fd811b',//'2f304bb0d158ad9e516eaf8d6aec157b',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
