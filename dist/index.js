'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var insertTable = require('./changes/insertTable');
var insertRow = require('./changes/insertRow');
var removeRow = require('./changes/removeRow');
var insertColumn = require('./changes/insertColumn');
var removeColumn = require('./changes/removeColumn');
var removeTable = require('./changes/removeTable');
var moveSelection = require('./changes/moveSelection');
var moveSelectionBy = require('./changes/moveSelectionBy');
var setColumnAlign = require('./changes/setColumnAlign');

var onEnter = require('./onEnter');
var onTab = require('./onTab');
var onBackspace = require('./onBackspace');
var onUpDown = require('./onUpDown');
var ALIGN = require('./ALIGN');
var makeSchema = require('./makeSchema');

var KEY_ENTER = 'enter';
var KEY_TAB = 'tab';
var KEY_BACKSPACE = 'backspace';
var KEY_DOWN = 'down';
var KEY_UP = 'up';

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 */
function EditTable(opts) {
    opts = opts || {};
    opts.typeTable = opts.typeTable || 'table';
    opts.typeRow = opts.typeRow || 'table_row';
    opts.typeCell = opts.typeCell || 'table_cell';

    /**
     * Is the selection in a table
     */
    function isSelectionInTable(state) {
        if (!state.selection.startKey) return false;

        var startBlock = state.startBlock;

        // Only handle events in cells

        return startBlock.type === opts.typeCell;
    }

    /**
     * Bind a change
     */
    function bindChange(fn) {
        return function (change) {
            var state = change.state;


            if (!isSelectionInTable(state)) {
                return change;
            }

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return fn.apply(undefined, _toConsumableArray([opts, change].concat(args)));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, change) {
        // Only handle events in cells
        if (!isSelectionInTable(change.state)) {
            return;
        }

        // Build arguments list
        var args = [e, data, change, opts];

        switch (data.key) {
            case KEY_ENTER:
                return onEnter.apply(undefined, args);
            case KEY_TAB:
                return onTab.apply(undefined, args);
            case KEY_BACKSPACE:
                return onBackspace.apply(undefined, args);
            case KEY_DOWN:
            case KEY_UP:
                return onUpDown.apply(undefined, args);
        }
    }

    var schema = makeSchema(opts);

    return {
        onKeyDown: onKeyDown,

        schema: schema,

        utils: {
            isSelectionInTable: isSelectionInTable
        },

        changes: {
            insertTable: insertTable.bind(null, opts),
            insertRow: bindChange(insertRow),
            removeRow: bindChange(removeRow),
            insertColumn: bindChange(insertColumn),
            removeColumn: bindChange(removeColumn),
            removeTable: bindChange(removeTable),
            moveSelection: bindChange(moveSelection),
            moveSelectionBy: bindChange(moveSelectionBy),
            setColumnAlign: bindChange(setColumnAlign)
        }
    };
}

// Expose align constants to the plugin
EditTable.ALIGN = ALIGN;

module.exports = EditTable;