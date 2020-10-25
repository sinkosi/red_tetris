import { config } from "./canvasConfig";
import drawBlock from "./drawBlock";

function CanvasGrid(
  context,
  colums = config.COLS,
  rows = config.ROWS,
  backgroundColour = config.EMPTY_BG
) {
  this.colums = colums;
  this.rows = rows;
  this.colour = backgroundColour;
  this.coords = [];

  this.init = () => {
    for (let row = 0; row < this.rows; row++) {
      this.coords[row] = [];
      for (let col = 0; col < this.colums; col++) {
        this.coords[row][col] = config.EMPTY_BG;
      }
    }
    this.draw();
  };

  this.draw = () => {
    let r = 0;
    let c = 0;
    while (this.coords[r]) {
      c = 0;
      while (this.coords[r][c]) {
        drawBlock(context, c, r, this.coords[r][c]);
        c++;
      }
      r++;
    }
  };

  this.penalty = (currentPiece) => {
    let y = 0;
    while (this.coords[y + 1]) {
      this.coords[y] = this.coords[y + 1];
      y++;
    }
    this.coords[y] = [];
    for (let c = 0; c < config.COLS; c++) {
      this.coords[y][c] = config.PENALTY_BG;
    }
    this.draw();

    if (currentPiece.y - 1 >= 0) currentPiece.y -= 1;
    currentPiece.draw();
  };

  this.removeFilledLines = () => {
    let numberOfLines = 0;
    for (let y = this.coords.length - 1; y > 0; y--) {
      let lineFull = true;
      for (let x = 0; x < this.coords[y].length; x++) {
        if (
          this.coords[y][x] === config.EMPTY_BG ||
          this.coords[y][x] === config.PENALTY_BG
        ) {
          lineFull = false;
          break;
        }
      }
      if (lineFull) {
        numberOfLines++;
        for (let z = y; z > 0; z--) {
          this.coords[z] = this.coords[z - 1];
        }
        this.coords[0] = [];
        for (let i = 0; i < this.colums; i++) {
          this.coords[0][i] = config.EMPTY_BG;
        }
        y++;
      }
      lineFull = true;
    }
    this.draw();
    return numberOfLines;
  };
}

export default CanvasGrid;
