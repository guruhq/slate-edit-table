const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./changes/moveSelectionBy');
const insertRow = require('./changes/insertRow');

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, change, opts) {
    event.preventDefault();
    const { state } = change;
    const direction = (event.shiftKey ? -1 : +1);

    // Create new row if needed
    const { startBlock, selection } = state;
    const pos = TablePosition.create(state, startBlock);
    if (pos.isFirstCell() && direction === -1) {
        insertRow(opts, change, 0);
    } else if (pos.isLastCell() && direction === 1) {
        insertRow(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change = change.select(selection);

    // Move
    moveSelectionBy(opts, change, direction, 0);

    // Select all cell.
    return change.moveToRangeOf(change.state.focusBlock);
}

module.exports = onTab;
