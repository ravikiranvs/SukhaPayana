'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'trygeospatialdb-secret',

  FACEBOOK_ID:      '1907988879426172',
  FACEBOOK_SECRET:  'ddc2f7e83ccf8d16de89d5eed4fd811b',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
