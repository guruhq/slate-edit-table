"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _utils = require("../utils");

var _clearCell = require("./clearCell");

var _clearCell2 = _interopRequireDefault(_clearCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Delete the column associated with the given cell key in a table
 */
function removeColumnByKey(opts, change, key) {
  var value = change.value;


  var pos = _utils.TablePosition.create(opts, value.document, key);
  var table = pos.table;


  var colIndex = pos.getColumnIndex();

  var rows = table.nodes;

  // Remove the cell from every row
  if (pos.getWidth() > 1) {
    rows.forEach(function (row) {
      var cell = row.nodes.get(colIndex);
      change.removeNodeByKey(cell.key, { normalize: false });
    });
  } else {
    // If last column, clear text in cells instead
    rows.forEach(function (row) {
      row.nodes.forEach(function (cell) {
        cell.nodes.forEach(function (node) {
          return (0, _clearCell2.default)(opts, change, cell);
        });
      });
    });
  }

  // Replace the table
  return change;
}
exports.default = removeColumnByKey;