function Game() {
  this.status = "waiting";

  this.start = function () {
    console.log("starting game....");
    this.status = "in-progress";
    this.generatePieces();
  };

  this.finish = function () {
    console.log("ending game....");
    this.status = "game-over";
    this.pieces = [];
  };

  this.pieces = [];
  this.generatePieces = function () {
    let newPieces = [];
    for (let i = 0; i < 3000; i++) {
      let pieceNum = Math.floor(Math.random() * 7);
      let pieceVariant = Math.floor(Math.random() * 4);
      newPieces.push([pieceNum, pieceVariant]);
    }
    this.pieces = this.pieces.concat(newPieces);
    return newPieces;
  };
  this.generatePieces();
}

export default Game;
