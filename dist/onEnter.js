'use strict';

var TablePosition = require('./TablePosition');
var moveSelectionBy = require('./changes/moveSelectionBy');
var insertRow = require('./changes/insertRow');

/**
 * Go to the row below on Enter if possible, if not, create a new row.
 */
function onEnter(event, change, opts) {
    event.preventDefault();
    var _change = change,
        state = _change.state;

    // Create new row if needed

    var startBlock = state.startBlock,
        selection = state.selection;

    var pos = TablePosition.create(state, startBlock);
    if (pos.isLastRow()) {
        insertRow(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change = change.select(selection);

    // Move
    moveSelectionBy(opts, change, 0, 1);

    return change;
}

module.exports = onEnter;