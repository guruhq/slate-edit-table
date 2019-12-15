"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("slate");

var _TablePosition = require("./TablePosition");

var _TablePosition2 = _interopRequireDefault(_TablePosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * The position of a particular node, in the current table
 */
function getPositionByKey(opts,
// The current value
containerNode,
// Key of the node in desired position
key) {
  return _TablePosition2.default.create(opts, containerNode, key);
}

exports.default = getPositionByKey;