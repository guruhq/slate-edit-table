module.exports = function(plugin, change) {
    const { state } = change;
    const blockStart = state.document.getDescendant('anchor');

    const withCursor = change
<<<<<<< HEAD:tests/backspace-collapsed/change.js
        .collapseToStartOf(blockStart)

      plugin.onKeyDown(
=======
        .collapseToStartOf(blockStart);

    plugin.onKeyDown(
>>>>>>> master:tests/backspace-collapsed/change.js
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'backspace' },
        withCursor
    );

    return change;
};
