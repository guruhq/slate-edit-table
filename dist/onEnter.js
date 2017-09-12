'use strict';

var insertRow = require('./changes/insertRow');

/**
 * Go to the row below on Enter if possible, if not, create a new row.
 */
function onEnter(event, data, change, opts) {
    event.preventDefault();
    var transform = state.transform();

    return insertRow(opts, change);
}

module.exports = onEnter;