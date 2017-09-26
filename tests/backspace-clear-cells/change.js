module.exports = function(plugin, change) {
    const { state } = change;
    const blockStart = state.document.getDescendant('anchor');
    const blockEnd = state.document.getDescendant('focus');

    const withCursor = change
        .collapseToStartOf(blockStart)
<<<<<<< HEAD:tests/backspace-clear-cells/change.js
        .extendToEndOf(blockEnd)
=======
        .extendToEndOf(blockEnd);
>>>>>>> master:tests/backspace-clear-cells/change.js

    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'backspace' },
        withCursor
    );
};
