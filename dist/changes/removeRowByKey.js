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
 * Remove the row associated to a given key in a table.
 * Clear thw row if last remaining row
 */
function removeRowByKey(opts, change, key) {
  var value = change.value;


  var pos = _utils.TablePosition.create(opts, value.document, key);

  // Update table by removing the row
  if (pos.getHeight() > 1) {
    change.removeNodeByKey(key);
  } else {
    // If last remaining row, clear it instead
    pos.row.nodes.forEach(function (cell) {
      cell.nodes.forEach(function (node) {
        return (0, _clearCell2.default)(opts, change, cell);
      });
    });
  }

  return change;
}
exports.default = removeRowByKey;