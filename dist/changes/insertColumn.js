"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _utils = require("../utils");

var _moveSelection = require("./moveSelection");

var _moveSelection2 = _interopRequireDefault(_moveSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Insert a new column in current table
 */
function insertColumn(opts, change, at, // Column index
getCell) {
  var value = change.value;
  var startKey = value.startKey;


  var pos = _utils.TablePosition.create(opts, value.document, startKey);
  var table = pos.table;


  var columnIndex = typeof at === "undefined" ? pos.getColumnIndex() + 1 : at;

  // Insert the new cell
  table.nodes.forEach(function (row, rowIndex) {
    var newCell = getCell ? getCell(columnIndex, rowIndex) : (0, _utils.createCell)(opts);
    change.insertNodeByKey(row.key, columnIndex, newCell, {
      normalize: false
    });
  });

  // Update the selection (not doing can break the undo)
  return (0, _moveSelection2.default)(opts, change, pos.getColumnIndex() + 1, pos.getRowIndex());
}
exports.default = insertColumn;