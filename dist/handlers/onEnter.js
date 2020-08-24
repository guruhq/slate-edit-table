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
    // This is a custom change to have the enter key move to the next row instead of creating a new one
    event.preventDefault();
    var value = change.value;

    // Create new row if needed

    var startKey = value.startKey,
        selection = value.selection,
        document = value.document;

    var pos = _utils.TablePosition.create(opts, document, startKey);
    if (pos.isLastRow()) {
        (0, _changes.insertRow)(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change.select(selection);

    // Move by 0 horizontally and 1 vertically
    (0, _changes.moveSelectionBy)(opts, change, 0, 1);

    return change;
}

exports.default = onEnter;