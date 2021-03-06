"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _TablePosition = require("./TablePosition");

var _TablePosition2 = _interopRequireDefault(_TablePosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The position of the selection start block, in the current table
 */
function getPosition(opts,
// The current value
value) {
  return _TablePosition2.default.create(opts, value.document, value.startKey);
}

exports.default = getPosition;