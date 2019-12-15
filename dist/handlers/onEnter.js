"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _utils = require("../utils");

var _changes = require("../changes");

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(event, change, editor, opts) {
  event.preventDefault();
  var _change$value = change.value,
      selection = _change$value.selection,
      document = _change$value.document;

  var pos = _utils.TablePosition.create(opts, document, selection.startKey);

  if (!selection.hasFocusAtStartOf(pos.cell) && !selection.hasFocusAtEndOf(pos.cell)) {
    return undefined;
  }

  if (event.shiftKey) {
    return change.splitBlock().setBlocks({ type: opts.typeContent, data: {} });
  }

  return (0, _changes.insertRow)(opts, change);
}
exports.default = onEnter;