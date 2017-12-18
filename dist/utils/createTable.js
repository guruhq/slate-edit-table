'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _slate = require('slate');

var _createRow = require('./createRow');

var _createRow2 = _interopRequireDefault(_createRow);

var _createAlign = require('./createAlign');

var _createAlign2 = _interopRequireDefault(_createAlign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a table
 */
function createTable(opts, columns, rows, textGetter) {
    var rowNodes = (0, _immutable.Range)(0, rows).map(function (i) {
        return (0, _createRow2.default)(opts, columns, textGetter ? textGetter.bind(null, i) : undefined);
    }).toList();
    var align = (0, _createAlign2.default)(columns);

    return _slate.Block.create({
        type: opts.typeTable,
        nodes: rowNodes,
        data: {
            align: align
        }
    });
}

exports.default = createTable;