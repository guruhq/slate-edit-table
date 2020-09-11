// @flow
import { Range } from 'slate';

import type Options from '../options';
import { clearCell } from '../changes';

function onBackspace(event, change, editor, opts) {
    const { value } = change;
    const { startBlock, startOffset, isCollapsed, endBlock } = value;

    // If a cursor is collapsed at the start of the block, do nothing

    if (startOffset === 0 && isCollapsed) {
        event.preventDefault();
        return change;
    }

    // If "normal" deletion, we continue
    if (startBlock === endBlock) {
        return null;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the cells
    event.preventDefault();

    const blocks = value.blocks;
    const focusBlock = value.focusBlock;

    blocks.forEach(block => {
        if (block.type !== opts.typeCell) {
            return change;
        }

        const cellRange = Range.create().moveToRangeOf(block);

        return change.deleteAtRange(cellRange);
    });

    // Clear selected cells
    return change.collapseToStartOf(focusBlock);
}

export default onBackspace;
