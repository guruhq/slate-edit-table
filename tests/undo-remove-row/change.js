
module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
<<<<<<< HEAD
    const initial = change.state.change({ save: false, }).moveToRangeOf(cursorBlock);
=======
    const initial = change.state.change({ save: false }).moveToRangeOf(cursorBlock);
>>>>>>> master
    const toTest = initial.state.change();
    plugin.changes.removeRow(toTest).undo();

    return toTest;
};
