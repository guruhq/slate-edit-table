'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

/**
 * Insert a new row in current table
 */
function insertRow(opts, change, at, // row index
textGetter) {
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;

    // Create a new row with the right count of cells

    var firstRow = table.nodes.get(0);
    var newRow = (0, _utils.createRow)(opts, firstRow.nodes.size, textGetter);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    return change.insertNodeByKey(table.key, at, newRow).collapseToEndOf(newRow.nodes.get(pos.getColumnIndex()));
}

exports.default = insertRow;