"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _utils = require("../utils");

/**
 * Move selection to {x,y}
 */
function moveSelection(opts, change, x, y) {
  var value = change.value;
  var startKey = value.startKey;

  var pos = _utils.TablePosition.create(opts, value.document, startKey);

  if (!pos.isInCell()) {
    throw new Error("moveSelection can only be applied from within a cell");
  }

  var table = pos.table;

  var row = table.nodes.get(y);
  var cell = row.nodes.get(x);

  return change.collapseToStartOf(cell);
}

exports.default = moveSelection;