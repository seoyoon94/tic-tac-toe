let Type = require('./type.js');

/*****************************************
 * Tic Tac Toe Grid
 * ***************************************/
function Grid(rows, cols, player) {
  this.rows = rows;
  this.cols = cols;
  this.player = new Type(player);
  this.board = []
}

Grid.prototype = {
  numRows: function() {
    return this.rows;
  },

  numCols: function() {
    return this.cols;
  },

  init: function(player) {
    for(let i = 0; i < this.rows * this.cols; ++i) {
      this.board.push(new Type());
    }
  },

  getPlayer: function(row, col) {
    return this.board[col + this.cols * row];
  },

  setPlayer: function(row, col, type = this.currentPlayer()) {
    this.board[col + this.cols * row].setType(type);
  },

  currentPlayer: function() {
    return this.player.getType();
  },

  changePlayer: function() {
    if(this.player.getType() === 'X') {
      this.player.setType('O');
    }
    else {
      this.player.setType('X');
    }
  },

  validMove: function(row, col) {
    if((row < 0 || row >= this.rows) ||
      (col < 0 || col >= this.cols)) {
        return false;
      }
    if(!this.getPlayer(row, col).isBlank()) {
      return false;
    }
    return true;
  },

  checkRow: function(row, type) {
    let rowIndex = row * 3;
    for(let i = rowIndex; i < rowIndex + 3; ++i) {
      if(this.board[i].getType() !== type) {
        return false;
      }
    }
    return true;
  },

  checkCol: function(col, type) {
    let colIndex = col;
    for(let i = colIndex; i < colIndex + 7; i += 3) {
      if(this.board[i].getType() !== type) {
        return false;
      }
    }
    return true;
  },

  checkDiagonal: function(type) {
    for(let i = 0; i < this.board.length; i += 4) {
      if(this.board[i].getType() !== type) {
        return false;
      }
    }
    return true;
  },

  checkReverseDiagonal: function(type) {
    for(let i = 2; i < 7; i += 2) {
      if(this.board[i].getType() !== type) {
        return false;
      }
    }
    return true;
  },

  gameWon: function(row, col, type = this.currentPlayer()) {
    return this.checkRow(row, type) || this.checkCol(col, type) || 
      this.checkDiagonal(type) || this.checkReverseDiagonal(type);
  },

  isDraw: function() {
    return !this.board.some(type => type.isBlank());
  },

  resetBoard: function() {
    this.board.forEach( (_, index) => {
      this.board[index] = new Type();
    });
  },

  toString: function() {
    let output = this.board.map( (type, index) => {
      if(index % 3 === 2) {
        return type.toString() + '\n';
      }
      return type.toString() + "   ";
    }).join("");
    return output;
  }
};

module.exports = Grid;
