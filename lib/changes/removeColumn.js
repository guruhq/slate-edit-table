const { List } = require('immutable');
const TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
<<<<<<< HEAD:lib/changes/removeColumn.js
 * @param {Object} opts
=======
 * @param {Options} opts The plugin options
>>>>>>> master:lib/changes/removeColumn.js
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeColumn(opts, change, at) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach((row) => {
            const cell = row.nodes.get(at);
            change.removeNodeByKey(cell.key);
        });

        // Update alignment
        let align = List(table.data.get('align'));
        align = align.delete(at);
        change.setNodeByKey(table.key, {
<<<<<<< HEAD:lib/changes/removeColumn.js
            data: Object.assign(table.data.toJS(), { align })
=======
            data: { align }
>>>>>>> master:lib/changes/removeColumn.js
        });
    }
    // If last column, clear text in cells instead
    else {
        rows.forEach((row) => {
            row.nodes.forEach((cell) => {
                cell.nodes.forEach((node) => {
                    // We clear the texts in the cells
                    change.removeNodeByKey(node.key);
                });
            });
        });
    }

    // Replace the table
    return change;
}

module.exports = removeColumn;
