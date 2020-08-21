'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var _changes = require('../changes');

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(event, change, editor, opts) {
    event.preventDefault();
    var value = change.value;

    // Create new row if needed

    var startBlock = value.startBlock,
        selection = value.selection;

    var pos = _utils.TablePosition.create(value, startBlock);
    if (pos.isLastRow()) {
        (0, _changes.insertRow)(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change.select(selection);

    // Move
    // moveSelectionBy(opts, change, 0, 1);

    (0, _changes.moveSelectionBy)(opts, change, 0, 1);

    return change;

    //   const { selection, document } = change.value;
    //   const pos = TablePosition.create(opts, document, selection.startKey);

    //   if (
    //     !selection.hasFocusAtStartOf(pos.cell) &&
    //     !selection.hasFocusAtEndOf(pos.cell)
    //   ) {
    //     return undefined;
    //   }

    //   if (event.shiftKey) {
    //     return change.splitBlock().setBlocks({ type: opts.typeContent, data: {} });
    //   }

    //   return insertRow(opts, change);
}

exports.default = onEnter;