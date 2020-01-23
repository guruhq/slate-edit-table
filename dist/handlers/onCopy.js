"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slateReact = require("slate-react");

require("slate");

var _utils = require("../utils");

/**
 *  Handle copying content of tables
 */
function onCopy(
// The plugin options
opts, event, change, editor) {
  var copiedFragment = (0, _utils.getCopiedFragment)(opts, change.value);

  if (!copiedFragment) {
    // Default copy behavior
    return null;
  }

  // Override default onCopy
  (0, _slateReact.cloneFragment)(event, change.value, copiedFragment);
  return true;
}
exports.default = onCopy;