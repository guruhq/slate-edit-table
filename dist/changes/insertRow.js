"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _utils = require("../utils");

/**
 * Insert a new row in current table
 */
function insertRow(opts, change, at, // row index
getRow // Generate the row yourself
) {
  var value = change.value;
  var startKey = value.startKey;


  var pos = _utils.TablePosition.create(opts, value.document, startKey);
  var table = pos.table;

  // Create a new row with the right count of cells

  var columns = table.nodes.get(0).nodes.size;
  var newRow = getRow ? getRow(columns) : (0, _utils.createRow)(opts, columns);

  if (typeof at === "undefined") {
    at = pos.getRowIndex() + 1;
  }

  return change.insertNodeByKey(table.key, at, newRow).collapseToEndOf(newRow.nodes.get(pos.getColumnIndex()));
}

exports.default = insertRow;