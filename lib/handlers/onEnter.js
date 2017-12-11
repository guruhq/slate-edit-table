import TablePosition from '../utils/TablePosition';
import moveSelectionBy from '../changes/moveSelectionBy';
import insertRow from '../changes/insertRow';

/**
 * Go to the row below on Enter if possible, if not, create a new row.
 */
function onEnter(event, change, opts) {
    event.preventDefault();
    const { value } = change;

    // Create new row if needed
    const { startBlock, selection } = value;
    const pos = TablePosition.create(value, startBlock);
    if (pos.isLastRow()) {
        insertRow(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change = change.select(selection);

    // Move
    moveSelectionBy(opts, change, 0, 1);

    return change;
}

export default onEnter;
