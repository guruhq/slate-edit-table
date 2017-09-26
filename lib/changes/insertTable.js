const createTable = require('../createTable');

/**
 * Insert a new table
 *
<<<<<<< HEAD:lib/changes/insertTable.js
 * @param {Object} opts
=======
 * @param {Options} opts The plugin options
>>>>>>> master:lib/changes/insertTable.js
 * @param {Slate.Change} change
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Change}
 */
function insertTable(opts, change, columns = 2, rows = 2) {
    const { state } = change;

    if (!state.selection.startKey) return false;

    // Create the table node
    const fillWithEmptyText = (x, y) => '';
    const table = createTable(opts, columns, rows, fillWithEmptyText);

    return change
        .insertBlock(table);
}

module.exports = insertTable;
