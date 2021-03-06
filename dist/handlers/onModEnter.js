"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slate = require("slate");

var _utils = require("../utils");

/**
 * Exit the current table, by inserting a default block after the table.
 */
function onModEnter(event, change, editor, opts) {
  var value = change.value;

  if (!value.isCollapsed) {
    return undefined;
  }

  event.preventDefault();

  var exitBlock = _slate.Block.create({
    type: opts.exitBlockType,
    nodes: [_slate.Text.create("")]
  });

  var table = _utils.TablePosition.create(opts, value.document, value.startKey).table;
  var tableParent = value.document.getParent(table.key);
  var insertionIndex = tableParent.nodes.indexOf(table) + 1;

  return change.insertNodeByKey(tableParent.key, insertionIndex, exitBlock).collapseToStartOf(exitBlock);
}

exports.default = onModEnter;