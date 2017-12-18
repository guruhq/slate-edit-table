'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _immutable = require('immutable');

var _utils = require('../utils');

var _changes = require('../changes');

var _ALIGN = require('../ALIGN');

var _ALIGN2 = _interopRequireDefault(_ALIGN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Insert a new column in current table
 */
function insertColumn(opts, change, at) {
    var columnAlign = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _ALIGN2.default.DEFAULT;
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach(function (row) {
        var newCell = (0, _utils.createCell)(opts.typeCell);
        change.insertNodeByKey(row.key, at, newCell, { normalize: false });
    });

    // Update alignment
    var align = table.data.get('align');
    align = (0, _immutable.List)(align).insert(at, columnAlign).toArray();
    change.setNodeByKey(table.key, {
        data: table.data.set('align', align)
    });

    // Update the selection (not doing can break the undo)
    return (0, _changes.moveSelection)(opts, change, pos.getColumnIndex() + 1, pos.getRowIndex());
}
exports.default = insertColumn;