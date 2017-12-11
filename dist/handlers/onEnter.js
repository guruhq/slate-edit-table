'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TablePosition = require('../utils/TablePosition');

var _TablePosition2 = _interopRequireDefault(_TablePosition);

var _moveSelectionBy = require('../changes/moveSelectionBy');

var _moveSelectionBy2 = _interopRequireDefault(_moveSelectionBy);

var _insertRow = require('../changes/insertRow');

var _insertRow2 = _interopRequireDefault(_insertRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Go to the row below on Enter if possible, if not, create a new row.
 */
function onEnter(event, change, opts) {
    event.preventDefault();
    var _change = change,
        value = _change.value;

    // Create new row if needed

    var startBlock = value.startBlock,
        selection = value.selection;

    var pos = _TablePosition2.default.create(value, startBlock);
    if (pos.isLastRow()) {
        (0, _insertRow2.default)(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change = change.select(selection);

    // Move
    (0, _moveSelectionBy2.default)(opts, change, 0, 1);

    return change;
}

exports.default = onEnter;