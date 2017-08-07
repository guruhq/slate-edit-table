'use strict';

var insertRow = require('./transforms/insertRow');
var moveSelection = require('./transforms/moveSelection');
var TablePosition = require('./TablePosition');

/**
 * Go to the row below on Enter if possible, if not, create a new row.
 */
function onEnter(event, data, state, opts) {
    if (data.isShift) {
        return;
    }
    event.preventDefault();
    var transform = state.transform();

    // Create new row if needed
    var startBlock = state.startBlock;

    var pos = TablePosition.create(state, startBlock);
    if (pos.getRowIndex() + 1 > pos.getHeight()) {
        transform = insertRow(opts, transform);
    }

    return moveSelection(opts, transform, pos.getColumnIndex(), pos.getRowIndex()).apply();
}

module.exports = onEnter;