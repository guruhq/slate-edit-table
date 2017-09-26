const TablePosition = require('../TablePosition');

/**
 * Move selection to {x,y}
 *
<<<<<<< HEAD:lib/changes/moveSelection.js
 * @param {Object} opts
=======
 * @param {Options} opts The plugin options
>>>>>>> master:lib/changes/moveSelection.js
 * @param {Slate.Change} change
 * @param {Number} x
 * @param {Number} y
 * @return {Slate.Change}
 */
function moveSelection(opts, change, x, y) {
    const { state } = change;
    let { startBlock, startOffset } = state;

    if (startBlock.type !== opts.typeCell) {
        throw new Error('moveSelection can only be applied from within a cell');
    }

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    const row  = table.nodes.get(y);
    const cell = row.nodes.get(x);

    // Calculate new offset
    if (startOffset > cell.text.length) {
        startOffset = cell.text.length;
    }

    return change
        .collapseToEndOf(cell)
        .moveOffsetsTo(startOffset);
}

module.exports = moveSelection;
