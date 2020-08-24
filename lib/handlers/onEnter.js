// @flow
import { TablePosition } from '../utils';
import { moveSelectionBy, insertRow } from '../changes';

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(event, change, editor, opts) {
    // This is a custom change to have the enter key move to the next row instead of creating a new one
    event.preventDefault();
    const { value } = change;

    // Create new row if needed
    const { startKey, selection, document } = value;
    const pos = TablePosition.create(opts, document, startKey);
    if (pos.isLastRow()) {
        insertRow(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change.select(selection);

    // Move by 0 horizontally and 1 vertically
    moveSelectionBy(opts, change, 0, 1);

    return change;
}

export default onEnter;
