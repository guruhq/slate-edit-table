"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require("immutable");

var _slate = require("slate");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TablePosition = function (_Record) {
  _inherits(TablePosition, _Record);

  function TablePosition() {
    _classCallCheck(this, TablePosition);

    return _possibleConstructorReturn(this, (TablePosition.__proto__ || Object.getPrototypeOf(TablePosition)).apply(this, arguments));
  }

  _createClass(TablePosition, [{
    key: "isInCell",


    /**
     * Check to see if this position is within a cell
     */
    value: function isInCell() {
      return Boolean(this.cellBlock);
    }

    /**
     * Check to see if this position is within a row
     */

  }, {
    key: "isInRow",
    value: function isInRow() {
      return Boolean(this.rowBlock);
    }

    /**
     * Check to see if this position is within a table
     */

  }, {
    key: "isInTable",
    value: function isInTable() {
      return Boolean(this.tableBlock);
    }

    /**
     * Check to see if this position is at the top of the cell.
     */

  }, {
    key: "isTopOfCell",
    value: function isTopOfCell() {
      var contentBlock = this.contentBlock,
          cellBlock = this.cellBlock;


      if (!contentBlock || !cellBlock) {
        return false;
      }

      var nodes = cellBlock.nodes;

      var index = nodes.findIndex(function (block) {
        return block.key == contentBlock.key;
      });

      return index == 0;
    }

    /**
     * Check to see if this position is at the bottom of the cell.
     */

  }, {
    key: "isBottomOfCell",
    value: function isBottomOfCell() {
      var contentBlock = this.contentBlock,
          cellBlock = this.cellBlock;


      if (!contentBlock || !cellBlock) {
        return false;
      }

      var nodes = cellBlock.nodes;

      var index = nodes.findIndex(function (block) {
        return block.key == contentBlock.key;
      });

      return index == nodes.size - 1;
    }

    /**
     * Get count of columns
     */

  }, {
    key: "getWidth",
    value: function getWidth() {
      var table = this.table;

      var rows = table.nodes;
      var cells = rows.first().nodes;

      return cells.size;
    }

    /**
     * Get count of rows
     */

  }, {
    key: "getHeight",
    value: function getHeight() {
      var table = this.table;

      var rows = table.nodes;

      return rows.size;
    }

    /**
     * Get index of current row in the table.
     */

  }, {
    key: "getRowIndex",
    value: function getRowIndex() {
      var table = this.table,
          row = this.row;

      var rows = table.nodes;

      return rows.findIndex(function (x) {
        return x === row;
      });
    }

    /**
     * Get index of current column in the row.
     */

  }, {
    key: "getColumnIndex",
    value: function getColumnIndex() {
      var row = this.row,
          cell = this.cell;

      var cells = row.nodes;

      return cells.findIndex(function (x) {
        return x === cell;
      });
    }

    /**
     * True if on first cell of the table
     */

  }, {
    key: "isFirstCell",
    value: function isFirstCell() {
      return this.isFirstRow() && this.isFirstColumn();
    }

    /**
     * True if on last cell of the table
     */

  }, {
    key: "isLastCell",
    value: function isLastCell() {
      return this.isLastRow() && this.isLastColumn();
    }

    /**
     * True if on first row
     */

  }, {
    key: "isFirstRow",
    value: function isFirstRow() {
      return this.getRowIndex() === 0;
    }

    /**
     * True if on last row
     */

  }, {
    key: "isLastRow",
    value: function isLastRow() {
      return this.getRowIndex() === this.getHeight() - 1;
    }

    /**
     * True if on first column
     */

  }, {
    key: "isFirstColumn",
    value: function isFirstColumn() {
      return this.getColumnIndex() === 0;
    }

    /**
     * True if on last column
     */

  }, {
    key: "isLastColumn",
    value: function isLastColumn() {
      return this.getColumnIndex() === this.getWidth() - 1;
    }
  }, {
    key: "table",
    get: function get() {
      if (!this.tableBlock) {
        throw new Error("Not in a table");
      }
      return this.tableBlock;
    }
  }, {
    key: "row",
    get: function get() {
      if (!this.rowBlock) {
        throw new Error("Not in a row");
      }
      return this.rowBlock;
    }
  }, {
    key: "cell",
    get: function get() {
      if (!this.cellBlock) {
        throw new Error("Not in a cell");
      }
      return this.cellBlock;
    }
  }], [{
    key: "create",


    /**
     * Create a new instance of a TablePosition from a Slate document
     * and a node key.
     */


    // Block for current cell

    // Block container for the table
    value: function create(opts, containerNode, key) {
      var node = containerNode.getDescendant(key);
      var ancestors = containerNode.getAncestors(key).push(node);
      var tableBlock = ancestors.findLast(function (p) {
        return p.type === opts.typeTable;
      });
      var rowBlock = ancestors.findLast(function (p) {
        return p.type === opts.typeRow;
      });

      var cellBlock = ancestors.findLast(function (p) {
        return p.type === opts.typeCell;
      });
      var contentBlock = ancestors.skipUntil(function (ancestor) {
        return ancestor === cellBlock;
      }).skip(1).first();

      return new TablePosition({
        tableBlock: tableBlock,
        rowBlock: rowBlock,
        cellBlock: cellBlock,
        contentBlock: contentBlock
      });
    }

    // Current content block in the cell


    // Block for current row

  }]);

  return TablePosition;
}((0, _immutable.Record)({
  tableBlock: null,
  rowBlock: null,
  cellBlock: null,
  contentBlock: null
}));

exports.default = TablePosition;