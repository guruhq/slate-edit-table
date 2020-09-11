"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slate = require("slate");

var _slateSchemaViolations = require("slate-schema-violations");

var _utils = require("../utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Returns a schema definition for the plugin
 */
function schema(opts) {
  var _blocks;

  return {
    blocks: (_blocks = {}, _defineProperty(_blocks, opts.typeTable, {
      nodes: [{ types: [opts.typeRow] }]
    }), _defineProperty(_blocks, opts.typeRow, {
      nodes: [{ types: [opts.typeCell] }],
      parent: { types: [opts.typeTable] },
      normalize: function normalize(change, violation, context) {
        switch (violation) {
          case _slateSchemaViolations.CHILD_TYPE_INVALID:
            return onlyCellsInRow(opts, change, context);
          case _slateSchemaViolations.PARENT_TYPE_INVALID:
            return rowOnlyInTable(opts, change, context);
          default:
            return undefined;
        }
      }
    }), _defineProperty(_blocks, opts.typeCell, {
      nodes: [{ objects: ["inline", "text"] }],
      parent: { types: [opts.typeRow] },
      normalize: function normalize(change, violation, context) {
        switch (violation) {
          case _slateSchemaViolations.CHILD_OBJECT_INVALID:
            return noBlocksWithinCell(opts, change, context);
          case _slateSchemaViolations.PARENT_TYPE_INVALID:
            return cellOnlyInRow(opts, change, context);
          default:
            return undefined;
        }
      }
    }), _blocks)
  };
}

/*
 * A row's children must be cells.
 * If they're not then we wrap them within a cell.
 */
function onlyCellsInRow(opts, change, context) {
  var cell = (0, _utils.createCell)(opts, []);
  var index = context.node.nodes.findIndex(function (child) {
    return child.key === context.child.key;
  });
  change.insertNodeByKey(context.node.key, index, cell, { normalize: false });
  change.moveNodeByKey(context.child.key, cell.key, 0, { normalize: false });
}

/*
 * Rows can't live outside a table, if one is found then we wrap it within a table.
 */
function rowOnlyInTable(opts, change, context) {
  return change.wrapBlockByKey(context.node.key, opts.typeTable);
}

/*
 * A cell's children must be "block"s.
 * If they're not then we wrap them within a block with a type of opts.typeContent
 * Save this for later
 */
function onlyBlocksInCell(opts, change, context) {
  var block = _slate.Block.create({
    type: opts.typeContent
  });
  change.insertNodeByKey(context.node.key, 0, block, { normalize: false });

  var inlines = context.node.nodes.filter(function (node) {
    return node.object !== "block";
  });
  inlines.forEach(function (inline, index) {
    change.moveNodeByKey(inline.key, block.key, index, {
      normalize: false
    });
  });
}

/* 
 * Temporary solution if it will help speed up tables
 */

function noBlocksWithinCell(opts, change, context) {
  if (context.child.object === "block") {
    if (context.child.isVoid) {
      return change.removeNodeByKey(context.child.key, { normalize: false });
    } else {
      change.unwrapNodeByKey(context.child.key);
    }
  }
  return change.normalize();
}

/*
 * Cells can't live outside a row, if one is found then we wrap it within a row.
 */
function cellOnlyInRow(opts, change, context) {
  return change.wrapBlockByKey(context.node.key, opts.typeRow);
}

exports.default = schema;