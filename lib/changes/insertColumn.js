const { List } = require('immutable');
const TablePosition = require('../TablePosition');
const moveSelection = require('./moveSelection');
const createCell = require('../createCell');
const ALIGN = require('../ALIGN');

/**
 * Insert a new column in current table
 *
<<<<<<< HEAD:lib/changes/insertColumn.js
 * @param {Object} opts
=======
 * @param {Options} opts The plugin options
>>>>>>> master:lib/changes/insertColumn.js
 * @param {Slate.Change} change
 * @param {Number} at
 * @param {String} columnAlign
 * @return {Slate.Change}
 */
function insertColumn(opts, change, at, columnAlign = ALIGN.DEFAULT) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach((row) => {
        const newCell = createCell(opts.typeCell);
        change = change.insertNodeByKey(row.key, at, newCell);
    });

    // Update alignment
    let align = List(table.data.get('align'));
    align = align.insert(at, columnAlign);
    change.setNodeByKey(table.key, {
<<<<<<< HEAD:lib/changes/insertColumn.js
        data: Object.assign(table.data.toJS(), { align })
=======
        data: { align }
>>>>>>> master:lib/changes/insertColumn.js
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(opts, change, pos.getColumnIndex() + 1, pos.getRowIndex());
}

module.exports = insertColumn;
