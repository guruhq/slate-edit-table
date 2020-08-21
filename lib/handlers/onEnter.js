// @flow
import { TablePosition } from '../utils';
import { moveSelectionBy, insertRow } from '../changes';

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(event, change, editor, opts) {
    event.preventDefault();
    const { value } = change;

    // Create new row if needed
    const { startKey, selection } = value;
    const pos = TablePosition.create(value, startKey);
    if (pos.isLastRow()) {
        insertRow(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change.select(selection);

    // Move
    // moveSelectionBy(opts, change, 0, 1);

    moveSelectionBy(opts, change, 0, 1);

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

export default onEnter;
