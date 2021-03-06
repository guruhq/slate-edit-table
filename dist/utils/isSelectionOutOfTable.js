"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TablePosition = require("./TablePosition");

var _TablePosition2 = _interopRequireDefault(_TablePosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Are the selection start and end outside a table.
 */
function isSelectionOutOfTable(opts, value) {
  if (!value.selection.startKey) return false;

  var startKey = value.startKey,
      endKey = value.endKey;


  var startPosition = _TablePosition2.default.create(opts, value.document, startKey);
  var endPosition = _TablePosition2.default.create(opts, value.document, endKey);

  // Only handle events in tables
  return !startPosition.isInTable() && !endPosition.isInTable();
}

exports.default = isSelectionOutOfTable;