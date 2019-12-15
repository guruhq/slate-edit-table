"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _changes = require("../changes");

var _utils = require("../utils");

/**
 * Used when pasting a fragment of table into another one
 */
function insertTableFragmentAtRange(opts, change, range,
// This fragment should contain only one table,
fragment) {
  var insertedTable = fragment.nodes.first();
  if (!(fragment.nodes.size === 1 && insertedTable && insertedTable.type === opts.typeTable)) {
    throw new Error("Expected to insert a fragment containing one table");
  }

  var value = change.value;

  var targetPosition = _utils.TablePosition.create(opts, value.document, value.selection.startKey);

  var fragmentRows = insertedTable.nodes;
  var fragmentHeight = fragmentRows.size;
  var fragmentWidth = fragmentRows.first().nodes.size;

  // Insert columns and rows to accomodate the incoming pasted cells
  var missingWidth = fragmentWidth + targetPosition.getColumnIndex() - targetPosition.getWidth();
  var missingHeight = fragmentHeight + targetPosition.getRowIndex() - targetPosition.getHeight();

  if (missingWidth > 0) {
    // Add columns
    Array(missingWidth).fill().forEach(function () {
      (0, _changes.insertColumn)(opts, change, targetPosition.getWidth());
    });
  }
  if (missingHeight > 0) {
    // Add rows
    Array(missingHeight).fill().forEach(function () {
      (0, _changes.insertRow)(opts, change, targetPosition.getHeight());
    });
  }

  // Patch the inserted table over the target table, overwritting the cells
  var existingTable = change.value.document.getDescendant(targetPosition.table.key);

  fragmentRows.forEach(function (fragmentRow, fragmentRowIndex) {
    fragmentRow.nodes.forEach(function (newCell, fragmentColumnIndex) {
      var existingCell = existingTable.nodes.get(targetPosition.getRowIndex() + fragmentRowIndex).nodes.get(targetPosition.getColumnIndex() + fragmentColumnIndex);

      change.replaceNodeByKey(existingCell.key, newCell, {
        normalize: false
      });
    });
  });

  var lastPastedCell = fragmentRows.last().nodes.last();
  return change.collapseToEndOf(lastPastedCell);
}
exports.default = insertTableFragmentAtRange;