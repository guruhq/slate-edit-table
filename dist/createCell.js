"use strict";

var Slate = require("slate");

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
function createCell(type, text) {
  text = text || "";

  return Slate.Block.create({
    type: type,
    nodes: [
      Slate.Text.fromJSON({
        object: "text",
        text: text
      })
    ]
  });
}

module.exports = createCell;
