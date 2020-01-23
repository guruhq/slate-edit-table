"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveSelectionBy = exports.moveSelection = exports.clearCell = exports.removeTableByKey = exports.removeTable = exports.removeColumnByKey = exports.removeColumn = exports.insertColumn = exports.removeRowByKey = exports.removeRow = exports.insertRow = exports.insertTableFragmentAtRange = exports.insertTable = undefined;

var _insertTable = require("./insertTable");

var _insertTable2 = _interopRequireDefault(_insertTable);

var _insertTableFragmentAtRange = require("./insertTableFragmentAtRange");

var _insertTableFragmentAtRange2 = _interopRequireDefault(_insertTableFragmentAtRange);

var _insertRow = require("./insertRow");

var _insertRow2 = _interopRequireDefault(_insertRow);

var _removeRow = require("./removeRow");

var _removeRow2 = _interopRequireDefault(_removeRow);

var _insertColumn = require("./insertColumn");

var _insertColumn2 = _interopRequireDefault(_insertColumn);

var _removeColumn = require("./removeColumn");

var _removeColumn2 = _interopRequireDefault(_removeColumn);

var _removeTable = require("./removeTable");

var _removeTable2 = _interopRequireDefault(_removeTable);

var _removeRowByKey = require("./removeRowByKey");

var _removeRowByKey2 = _interopRequireDefault(_removeRowByKey);

var _removeColumnByKey = require("./removeColumnByKey");

var _removeColumnByKey2 = _interopRequireDefault(_removeColumnByKey);

var _removeTableByKey = require("./removeTableByKey");

var _removeTableByKey2 = _interopRequireDefault(_removeTableByKey);

var _clearCell = require("./clearCell");

var _clearCell2 = _interopRequireDefault(_clearCell);

var _moveSelection = require("./moveSelection");

var _moveSelection2 = _interopRequireDefault(_moveSelection);

var _moveSelectionBy = require("./moveSelectionBy");

var _moveSelectionBy2 = _interopRequireDefault(_moveSelectionBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.insertTable = _insertTable2.default;
exports.insertTableFragmentAtRange = _insertTableFragmentAtRange2.default;
exports.insertRow = _insertRow2.default;
exports.removeRow = _removeRow2.default;
exports.removeRowByKey = _removeRowByKey2.default;
exports.insertColumn = _insertColumn2.default;
exports.removeColumn = _removeColumn2.default;
exports.removeColumnByKey = _removeColumnByKey2.default;
exports.removeTable = _removeTable2.default;
exports.removeTableByKey = _removeTableByKey2.default;
exports.clearCell = _clearCell2.default;
exports.moveSelection = _moveSelection2.default;
exports.moveSelectionBy = _moveSelectionBy2.default;