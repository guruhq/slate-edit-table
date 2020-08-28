"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slateReact = require("slate-react");

var _slate = require("slate");

var _utils = require("../utils");

var _changes = require("../changes");

/**
 *  Handle pasting inside tables
 */
function onPaste(
// The plugin options
opts, event, change, editor) {
  // Outside of tables, do not alter paste behavior
  if (!(0, _utils.isSelectionInTable)(opts, change.value)) {
    return undefined;
  }

  var transfer = (0, _slateReact.getEventTransfer)(event);
  var type = transfer.type,
      fragment = transfer.fragment;


  if (type != "fragment" || fragment.nodes.isEmpty()) {
    return null;
  }

  if (!(0, _utils.isRangeInTable)(opts, fragment, _slate.Range.create({
    anchorKey: fragment.getFirstText().key,
    focusKey: fragment.getLastText().key
  }))) {
    var parent = change.value.document.getParent(change.value.focusBlock.key);

    change.insertFragmentAtRange(change.value.selection, fragment);

    if (parent.text === "" && !parent.nodes.first().nodes.some(function (node) {
      return node.isVoid;
    })) {
      change.deleteForward(1);
    }
    return change;
  }

  return (0, _changes.insertTableFragmentAtRange)(opts, change, change.value.selection, fragment);
}

exports.default = onPaste;