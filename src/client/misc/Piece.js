import { config } from "./canvasConfig";
import drawBlock from "./drawBlock";
import { pieces, pieceStartPosition } from "./pieces";

/***
 * Tetramino Class
 */

function Piece(context, grid, piece, colour) {
  this.piece = piece;
  this.colour = colour;
  this.active = 0;
  this.x = 0;
  this.y = 0;
  this.context = context;
  this.grid = grid;
  this.locked = false;

  this.draw = (active = this.active) => {
    this.active = active;

    for (let row = 0; row < this.piece[this.active].length; row++) {
      for (let col = 0; col < this.piece[this.active][row].length; col++) {
        if (this.piece[this.active][row][col] && this.y + row >= 0)
          drawBlock(this.context, this.x + col, this.y + row, this.colour);
      }
    }
  };
  this.clear = (active = this.active) => {
    this.active = active;

    for (let row = 0; row < this.piece[this.active].length; row++) {
      for (let col = 0; col < this.piece[this.active][row].length; col++) {
        if (this.piece[this.active][row][col])
          drawBlock(this.context, this.x + col, this.y + row, config.EMPTY_BG);
      }
    }
  };
  this.lock = () => {
    this.locked = true;
    for (let row = 0; row < this.piece[this.active].length; row++) {
      for (let col = 0; col < this.piece[this.active][row].length; col++) {
        if (this.piece[this.active][row][col])
          this.grid.coords[this.y + row][this.x + col] = this.colour;
      }
    }
  };

  this.rotate = () => {
    if (this.locked) return;
    if (!this.isCollision(this.x, this.y, (this.active + 1) % 4)) {
      this.clear();
      this.active = (1 + this.active) % this.piece.length;
      this.draw();
    } else if (!this.isCollision(this.x + 1, this.y, (this.active + 1) % 4)) {
      this.clear();
      this.x = this.x + 1;
      this.active = (1 + this.active) % this.piece.length;
      this.draw();
    } else if (!this.isCollision(this.x - 1, this.y, (this.active + 1) % 4)) {
      this.clear();
      this.x = this.x - 1;

      this.active = (1 + this.active) % this.piece.length;
      this.draw();
    } else if (!this.isCollision(this.x - 2, this.y, (this.active + 1) % 4)) {
      this.clear();
      this.x = this.x - 2;

      this.active = (1 + this.active) % this.piece.length;
      this.draw();
    }
  };

  this.moveLeft = () => {
    if (this.locked) return;
    if (!this.isCollision(this.x - 1)) {
      this.clear();
      this.x = this.x - 1;
      this.draw();
    }
  };

  this.moveRight = () => {
    if (this.locked) return;
    if (!this.isCollision(this.x + 1)) {
      this.clear();
      this.x = this.x + 1;
      this.draw();
    }
  };

  this.moveDown = () => {
    if (this.locked) return;
    if (!this.isCollision(this.x, this.y + 1)) {
      this.clear();
      this.y = this.y + 1;
      this.draw();
      return true;
    }
    return false;
  };

  this.fall = () => {
    let i = 0;
    let y = this.y;
    let x = this.x;
    if (this.locked) return;

    while (!this.isCollision(this.x, this.y + 1)) {
      // this.clear();
      i++;
      this.y = this.y + 1;
      this.draw();
    }
    // this.y = y;

    // i++;
    this.lock();
    setTimeout(() => {
      this.x = x;
      this.y = y;
      while (i--) {
        this.clear();
        this.y = this.y + 1;
      }
      this.draw();
      // this.lock();
    }, 80);

    // this.draw();

    // return false;
  };

  this.isCollision = (newX = this.x, newY = this.y, newState = this.active) => {
    for (let row = 0; row < this.piece[newState].length; row++) {
      for (let col = 0; col < this.piece[newState][row].length; col++) {
        if (this.piece[newState][row][col]) {
          if (
            newX + col < 0 ||
            newX + col >= config.COLS ||
            newY + row >= config.ROWS
          ) {
            console.log("collision");
            return true;
          }
          if (
            newY + row >= 0 &&
            this.grid.coords[newY + row][newX + col] !== config.EMPTY_BG
          ) {
            return true;
          }
        }
      }
    }

    return false;
  };
}

function newPiece(pieceNum, pieceVariant, context, grid) {
  // if (!context || !grid) return null

  let newPiece = new Piece(
    context,
    grid,
    pieces[pieceNum][0],
    pieces[pieceNum][1]
  );

  newPiece.active = pieceVariant;
  let [y, x] = pieceStartPosition(pieceNum, pieceVariant);
  newPiece.x = x;
  newPiece.y = y;

  // newPiece.draw()
  // if (newPiece.isCollision(x, y, pieceVariant)) return null
  return newPiece;
}

export { newPiece };
export default Piece;
