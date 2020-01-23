"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TablePosition = require("./TablePosition");

var _TablePosition2 = _interopRequireDefault(_TablePosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * True if the given range is inside one table
 */
function isRangeInTable(opts, node, range) {
  var startKey = range.startKey,
      endKey = range.endKey;

  var startPosition = _TablePosition2.default.create(opts, node, startKey);
  var endPosition = _TablePosition2.default.create(opts, node, endKey);

  // Only handle events in tables
  if (!startPosition.isInTable() || !endPosition.isInTable()) {
    return false;
  }

  // Inside the same table
  return startPosition.table === endPosition.table;
}

exports.default = isRangeInTable;