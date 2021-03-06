"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _utils = require("../utils");

/**
 * Insert a new table
 */
function insertTable(opts, change) {
  var columns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var rows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
  var getCellContent = arguments[4];
  var value = change.value;


  if (!value.selection.startKey) return change;

  // Create the table node
  var table = (0, _utils.createTable)(opts, columns, rows, getCellContent);

  return change.insertBlock(table);
}

exports.default = insertTable;