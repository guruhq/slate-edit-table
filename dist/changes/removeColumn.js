"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _utils = require("../utils");

var _removeColumnByKey = require("./removeColumnByKey");

var _removeColumnByKey2 = _interopRequireDefault(_removeColumnByKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Delete current column in a table
 */
function removeColumn(opts, change, at) {
  var value = change.value;
  var startKey = value.startKey;


  var pos = _utils.TablePosition.create(opts, value.document, startKey);

  var columnKey = void 0;
  if (typeof at === "undefined") {
    columnKey = pos.cell.key;
  } else {
    columnKey = pos.row.nodes.get(at).key;
  }

  return (0, _removeColumnByKey2.default)(opts, change, columnKey);
}
exports.default = removeColumn;