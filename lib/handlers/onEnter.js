const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./changes/moveSelectionBy');
const insertRow = require('./changes/insertRow');

/**
 * Go to the row below on Enter if possible, if not, create a new row.
 */
function onEnter(event, change, opts) {
    event.preventDefault();
    const { value } = change;

    // Create new row if needed
    const { startBlock, selection } = state;
    const pos = TablePosition.create(state, startBlock);
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
