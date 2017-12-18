'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

/**
 * Create a new cell
 */
function createCell(type) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return _slate.Block.create({
        type: type,
        nodes: [_slate.Text.fromJSON({
            kind: 'text',
            text: text
        })]
    });
}
exports.default = createCell;