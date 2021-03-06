"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _utils = require("../utils");

var _changes = require("../changes");

function onUpDown(event, change, editor, opts) {
  var value = change.value;

  var direction = event.key === "ArrowUp" ? -1 : +1;
  var pos = _utils.TablePosition.create(opts, value.document, value.startKey);

  if (pos.isFirstRow() && direction === -1 || pos.isLastRow() && direction === +1) {
    // Let the default behavior move out of the table
    return undefined;
  }

  if (direction === -1 && !pos.isTopOfCell()) {
    return undefined;
  }

  if (direction === +1 && !pos.isBottomOfCell()) {
    return undefined;
  }

  event.preventDefault();

  (0, _changes.moveSelectionBy)(opts, change, 0, direction);

  return change;
}
exports.default = onUpDown;