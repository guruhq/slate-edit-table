'use strict';

var insertRow = require('./changes/insertRow');

/**
 * Go to the row below on Enter if possible, if not, create a new row.
 */
function onEnter(event, change, opts) {
  event.preventDefault();

  return insertRow(opts, change);
}

module.exports = onEnter;