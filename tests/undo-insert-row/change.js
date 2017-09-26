const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
<<<<<<< HEAD
    const initial = change.state.change({ save: false, });
=======
    const initial = change.state.change({ save: false });
>>>>>>> master
    initial.moveToRangeOf(cursorBlock);
    const toTest = initial.state.change();
    plugin.changes.insertRow(toTest);

    toTest.undo();

    // Back to previous cursor position
    expect(toTest.state.startBlock.text).toEqual('Col 1, Row 1');

    return toTest;
};
