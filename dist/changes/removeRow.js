"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _utils = require("../utils");

var _removeRowByKey = require("./removeRowByKey");

var _removeRowByKey2 = _interopRequireDefault(_removeRowByKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Remove current row in a table. Clear it if last remaining row
 */
function removeRow(opts, change, at) {
  var value = change.value;
  var startKey = value.startKey;


  var pos = _utils.TablePosition.create(opts, value.document, startKey);

  var rowKey = void 0;
  if (typeof at === "undefined") {
    rowKey = pos.row.key;
  } else {
    rowKey = pos.table.nodes.get(at).key;
  }

  return (0, _removeRowByKey2.default)(opts, change, rowKey);
}
exports.default = removeRow;