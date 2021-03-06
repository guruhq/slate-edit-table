"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _changes = require("./changes");

var _utils = require("./utils");

var _validation = require("./validation");

var _options = require("./options");

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Returns the core of the plugin, limited to the validation and normalization
 * part of `slate-edit-table`, and utils.
 *
 * Import this directly: `import EditTable from '@gitbook/slate-edit-table/lib/core'`
 * if you don't care about behavior/rendering and you
 * are only manipulating `Slate.Values` without rendering them.
 * That way you do not depend on `slate-react`.
 */
function core(optionsParam) {
  var opts = new _options2.default(optionsParam);

  return {
    schema: (0, _validation.schema)(opts),
    validateNode: (0, _validation.validateNode)(opts),

    utils: {
      isSelectionInTable: _utils.isSelectionInTable.bind(null, opts),
      isSelectionOutOfTable: _utils.isSelectionOutOfTable.bind(null, opts),
      getPosition: _utils.getPosition.bind(null, opts),
      getPositionByKey: _utils.getPositionByKey.bind(null, opts),
      createCell: _utils.createCell.bind(null, opts),
      createRow: _utils.createRow.bind(null, opts),
      createTable: _utils.createTable.bind(null, opts),
      forEachCells: _utils.forEachCells.bind(null, opts),
      getCellsAtRow: _utils.getCellsAtRow.bind(null, opts),
      getCellsAtColumn: _utils.getCellsAtColumn.bind(null, opts),
      getCopiedFragment: _utils.getCopiedFragment.bind(null, opts)
    },

    changes: {
      insertTable: _changes.insertTable.bind(null, opts),
      insertTableFragmentAtRange: _changes.insertTableFragmentAtRange.bind(null, opts),
      clearCell: _changes.clearCell.bind(null, opts),
      removeRowByKey: _changes.removeRowByKey.bind(null, opts),
      removeColumnByKey: _changes.removeColumnByKey.bind(null, opts),
      removeTableByKey: _changes.removeTableByKey.bind(null, opts),
      insertRow: bindAndScopeChange(opts, _changes.insertRow),
      removeRow: bindAndScopeChange(opts, _changes.removeRow),
      insertColumn: bindAndScopeChange(opts, _changes.insertColumn),
      removeColumn: bindAndScopeChange(opts, _changes.removeColumn),
      removeTable: bindAndScopeChange(opts, _changes.removeTable),
      moveSelection: bindAndScopeChange(opts, _changes.moveSelection),
      moveSelectionBy: bindAndScopeChange(opts, _changes.moveSelectionBy)
    }
  };
}

/**
 * Bind a change to given options, and scope it to act only inside a table
 */
function bindAndScopeChange(opts, fn) {
  return function (change) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var value = change.value;


    if (!(0, _utils.isSelectionInTable)(opts, value)) {
      return change;
    }

    // $FlowFixMe
    return fn.apply(undefined, _toConsumableArray([opts, change].concat(args)));
  };
}

exports.default = core;