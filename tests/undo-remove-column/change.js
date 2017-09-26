
module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
<<<<<<< HEAD
    const initial = change.state.change({ save: false, });
=======
    const initial = change.state.change({ save: false });
>>>>>>> master
    initial.moveToRangeOf(cursorBlock);
    const toTest = initial.state.change();
    plugin.changes.removeColumn(toTest);
    toTest.undo();

    return toTest;
};
