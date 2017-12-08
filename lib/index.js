<<<<<<< HEAD
const insertTable     = require('./changes/insertTable');
const insertRow       = require('./changes/insertRow');
const removeRow       = require('./changes/removeRow');
const insertColumn    = require('./changes/insertColumn');
const removeColumn    = require('./changes/removeColumn');
const removeTable     = require('./changes/removeTable');
const moveSelection   = require('./changes/moveSelection');
const moveSelectionBy = require('./changes/moveSelectionBy');
const setColumnAlign  = require('./changes/setColumnAlign');

const Options     = require('./options');
const onEnter     = require('./onEnter');
const onModEnter  = require('./onModEnter');
const onTab       = require('./onTab');
const onBackspace = require('./onBackspace');
const onUpDown    = require('./onUpDown');
const ALIGN       = require('./ALIGN');
const makeSchema  = require('./makeSchema');
const TablePosition = require('./TablePosition');

const KEY_ENTER     = 'Enter';
const KEY_TAB       = 'Tab';
const KEY_BACKSPACE = 'Backspace';
const KEY_DOWN      = 'ArrowDown';
const KEY_UP        = 'ArrowUp';
=======
/* @flow */
>>>>>>> bb32a6a14ef81b49612977f2c66d9f620e490d96

import Options, { type OptionsFormat } from './options';
import ALIGN from './ALIGN';
import core from './core';
import { onKeyDown } from './handlers';

/**
 *  Returns the full plugin object (behavior + rendering + schema)
 */
<<<<<<< HEAD
function EditTable(opts) {
    opts = new Options(opts);

    /**
     * Is the selection in a table
     */
    function isSelectionInTable(state) {
        if (!state.selection.startKey) return false;

        const { startBlock } = state;

        // Only handle events in cells
        return (startBlock.type === opts.typeCell);
    }

    /**
     * @param {State} state The current state
     * @returns {TablePosition} The position of the selection start, in the current table
     * @throws {Error} If the start of the selection is not in a table
     */
    function getPosition(state) {
        if (!isSelectionInTable(state)) {
            throw new Error('Not in a table');
        }
        const cell = state.startBlock;
        return TablePosition.create(state, cell);
    }

    /**
     * Bind a change
     */
    function bindChange(fn) {
        return function(change, ...args) {
            const { state } = change;

            if (!isSelectionInTable(state)) {
                return change;
            }

            return fn(...[opts, change].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(event, change) {
        // Only handle events in cells
        if (!isSelectionInTable(change.state)) {
            return;
        }

        // Build arguments list
        const args = [
            event, change,
            opts
        ];

        switch (event.key) {
        case KEY_ENTER:
            const isMac = window.navigator.platform.includes('Mac');
            const property = isMac ? 'metaKey' : 'ctrlKey';
            if (event[property] && opts.exitBlockType) {
                return onModEnter(...args);
            } else {
                return onEnter(...args);
            }
        case KEY_TAB:
            return onTab(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown(...args);
        }
    }

    const schema = makeSchema(opts);
=======
function EditTable(
    // The plugin options
    optionsParam?: OptionsFormat
): Object {
    const opts = new Options(optionsParam || {});
    const corePlugin = core(opts);
>>>>>>> bb32a6a14ef81b49612977f2c66d9f620e490d96

    return {
        ...corePlugin,

        onKeyDown: onKeyDown.bind(null, opts)
    };
}

// Expose align constants to the plugin
EditTable.ALIGN = ALIGN;

export default EditTable;
