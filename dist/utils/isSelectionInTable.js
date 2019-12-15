"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isRangeInTable = require("./isRangeInTable");

var _isRangeInTable2 = _interopRequireDefault(_isRangeInTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts, value) {
  if (!value.selection.startKey) return false;
  return (0, _isRangeInTable2.default)(opts, value.document, value.selection);
}

exports.default = isSelectionInTable;