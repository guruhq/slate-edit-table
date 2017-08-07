const insertRow = require('./transforms/insertRow');
const moveSelection = require('./transforms/moveSelection');
const TablePosition = require('./TablePosition');

/**
 * Go to the row below on Enter if possible, if not, create a new row.
 */
function onEnter(event, data, state, opts) {
    if (data.isShift) { return; }
    event.preventDefault();
    let transform = state.transform();

    // Create new row if needed
    const { startBlock } = state;
    const pos = TablePosition.create(state, startBlock);
    if (pos.getRowIndex() + 2 > pos.getHeight()) {
        transform = insertRow(opts, transform);
    }

    return moveSelection(opts, transform, pos.getColumnIndex(), pos.getRowIndex() + 1)
        .apply();
}

module.exports = onEnter;
