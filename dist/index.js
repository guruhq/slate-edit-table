"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _options = require("./options");

var _options2 = _interopRequireDefault(_options);

var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

var _handlers = require("./handlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Returns the full plugin object (behavior + rendering + schema)
 */
function EditTable(
// The plugin options
optionsParam) {
  var opts = new _options2.default(optionsParam || {});
  var corePlugin = (0, _core2.default)(opts);

  return _extends({}, corePlugin, {

    onKeyDown: _handlers.onKeyDown.bind(null, opts),
    onCopy: _handlers.onCopy.bind(null, opts),
    onPaste: _handlers.onPaste.bind(null, opts)
  });
}

exports.default = EditTable;