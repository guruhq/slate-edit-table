"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slate = require("slate");

var _utils = require("../utils");

/**
 * Delete the whole table at the given node key
 */
function removeTableByKey(opts, change, key) {
  var value = change.value;


  var pos = _utils.TablePosition.create(opts, value.document, key);
  var table = pos.table;
  var document = change.value.document;

  var nextFocusBlock = null;
  var shouldCollapseToEnd = false;

  var nextBlock = change.value.document.getNextBlock(table.key);
  if (nextBlock) {
    nextFocusBlock = nextBlock;
  } else {
    var prevBlock = change.value.document.getPreviousBlock(table.key);
    if (prevBlock) {
      nextFocusBlock = prevBlock;
      shouldCollapseToEnd = true;
    } else if (opts.exitBlockType) {
      nextFocusBlock = _slate.Block.create({
        type: opts.exitBlockType,
        nodes: [_slate.Text.create("")]
      });
      var tableParent = document.getParent(table.key);
      var insertionIndex = tableParent.nodes.indexOf(table) + 1;
      change.insertNodeByKey(tableParent.key, insertionIndex, nextFocusBlock);
    }
  }

  change.removeNodeByKey(table.key);
  if (!nextFocusBlock) {
    return change;
  }
  if (shouldCollapseToEnd) {
    change.collapseToEndOf(nextFocusBlock).focus();
  } else {
    change.collapseToStartOf(nextFocusBlock).focus();
  }
  return change;
}

exports.default = removeTableByKey;