import { newPiece } from "./Piece";

function controls(key, piece, grid, context) {
  if (key === "ArrowUp") piece.rotate();
  if (key === "ArrowLeft") piece.moveLeft();
  if (key === "ArrowRight") piece.moveRight();
  if (key === "ArrowDown") piece.moveDown();
  if (key === "l") piece.lock();
  if (key === "p") grid.penalty(piece);
  if (key === "n") newPiece(context, grid);
}

export default controls;
