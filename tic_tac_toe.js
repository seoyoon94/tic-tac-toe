let Type = require('./type.js');
let Grid = require('./grid.js');
const readline = require('readline');

'use strict';

/***************************************
 * Main execution
 * *************************************/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Which player would you like to be?\nPlease type in either 'x' or 'o'.\n", (answer) => {
  grid = new Grid(3, 3, answer.toUpperCase());
  grid.init();
  console.log(grid.toString());
  playGame();
});

let playGame = function() {
  rl.question("Select row: ", (row) => {
    rl.question("Select col: ", (col) => {
      if(grid.validMove(+row - 1, +col - 1)) {
        grid.setPlayer(+row - 1, +col - 1);
        if(grid.gameWon(+row - 1, +col - 1)) {
          console.log("Congratulations! You have won the game.");
          rl.close();
        }
        else if(grid.isDraw()) {
          console.log("Game has ended in a draw.");
          console.log(grid.toString());
          rl.close();
        }
        else {
          grid.changePlayer();
          console.log(grid.toString());
          playGame();
        }
      }
      else {
        console.log("You have made an invalid move!. Please try again.");
        console.log(grid.toString());
        playGame();
      }
    });
  });
}

