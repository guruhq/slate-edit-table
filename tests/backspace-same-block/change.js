const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const blockStart = state.document.getDescendant('anchor');
    const blockEnd = state.document.getDescendant('anchor');

    const withCursor = change
        .collapseToStartOf(blockStart)
<<<<<<< HEAD:tests/backspace-same-block/change.js
        .extendToEndOf(blockEnd)
=======
        .extendToEndOf(blockEnd);
>>>>>>> master:tests/backspace-same-block/change.js

    const result = plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'backspace' },
        withCursor
    );

    expect(result).toBe(null);

    return change;
};
