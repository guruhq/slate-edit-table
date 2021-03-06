"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("../utils");

/*
 * Ensure each row has the same number of columns.
 */
function validateNode(opts) {
  var isRow = function isRow(node) {
    return node.type === opts.typeRow;
  };
  var isCell = function isCell(node) {
    return node.type === opts.typeCell;
  };
  var countCells = function countCells(row) {
    return row.nodes.count(isCell);
  };

  return function (node) {
    if (node.type !== opts.typeTable) {
      return undefined;
    }

    var rows = node.nodes.filter(isRow);
    var maxColumns = Math.max(
    // Minimum 1 column
    1, rows.map(countCells).max());
    var rowsMissingColumns = rows.filter(function (row) {
      return countCells(row) < maxColumns;
    });

    if (rowsMissingColumns.isEmpty()) {
      return undefined;
    }

    return function (change) {
      rowsMissingColumns.forEach(function (row) {
        var numberOfCellsToAdd = maxColumns - row.nodes.size;
        var cells = Array.from({ length: numberOfCellsToAdd }).map(function () {
          return (0, _utils.createCell)(opts);
        });
        cells.forEach(function (cell) {
          return change.insertNodeByKey(row.key, row.nodes.size, cell, {
            normalize: false
          });
        });
      });
    };
  };
}

exports.default = validateNode;