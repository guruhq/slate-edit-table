"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _immutable = require("immutable");

var _utils = require("../utils");

/*
 * Alters what is copied to the clipboard when copying a fragment of a table:
 * - Copying the content of a single cell: just copy the content of the cell
 * - Copying multiple cells: normalize the selection to copy a valid table
 */
function getCopiedFragment(opts, value) {
  // Outside of tables, do not alter copy behavior
  if (!(0, _utils.isSelectionInTable)(opts, value)) {
    return undefined;
  }
  // else the selection is a fragment of one table

  var selection = value.selection,
      document = value.document;

  var startPosition = _utils.TablePosition.create(opts, document, selection.startKey);
  var endPosition = _utils.TablePosition.create(opts, document, selection.endKey);

  // Fragment as it would be copied by Slate
  var baseFragment = value.fragment;

  if (endPosition.cell === startPosition.cell) {
    // The selection is inside a single cell. Only copy the content of that cell
    var copiedCell = baseFragment.getAncestors(baseFragment.getFirstText().key).findLast(function (n) {
      return n.type === opts.typeCell;
    });

    return baseFragment.merge({
      nodes: copiedCell.nodes
    });
  }

  // We want to pad with empty cells to put a valid table into the clipboard
  var table = baseFragment.nodes.first();
  var firstRow = table.nodes.first();
  var endRow = table.nodes.last();

  var startPadding = (0, _immutable.List)(Array(startPosition.getColumnIndex()).fill()).map(function () {
    return (0, _utils.createCell)(opts);
  });

  var endPadding = (0, _immutable.List)(Array(endPosition.getWidth() - (endPosition.getColumnIndex() + 1)).fill()).map(function () {
    return (0, _utils.createCell)(opts);
  });

  return baseFragment.mapDescendants(function (node) {
    if (node === firstRow) {
      return firstRow.merge({
        nodes: startPadding.concat(firstRow.nodes)
      });
    }

    if (node === endRow) {
      return endRow.merge({
        nodes: endRow.nodes.concat(endPadding)
      });
    }

    return node;
  });
}
exports.default = getCopiedFragment;