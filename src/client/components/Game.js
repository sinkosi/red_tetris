import React, { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import controls from "../misc/controls";
import { newPiece } from "../misc/Piece";
import GameCanvas from "./GameCanvas";

const Game = (props) => {
  const [gameOver, setGameOver] = useState(false);
  const [grid, setGrid] = useState(null);
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [context, setContext] = useState(null);
  const { connection } = useContext(ConnectionContext);

  useEffect(() => {
    // setCurrentPiece(newPiece())
    setNextPiece(newPiece());
  }, []);

  const getNextPiece = () => {
    console.log("getNextPiece was called");
    let next = nextPiece;
    next.context = context;
    next.grid = grid;
    // console.log({ next })
    // grid.draw()
    next.draw();
    setCurrentPiece(next);
    if (next.isCollision()) {
      props.setGameLoaded(false);
      connection.emit("lost");
      setGrid(null);
      setContext(null);
    }
    setNextPiece(newPiece());
    return next;
  };

  useEffect(() => {
    const handleKeyPress = ({ key }) =>
      controls(key, currentPiece, grid, context);
    if (currentPiece) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentPiece, grid, context]);

  return (
    <>
      <GameCanvas
        setGameOver={setGameOver}
        grid={grid}
        setGrid={setGrid}
        currentPiece={currentPiece}
        setCurrentPiece={setCurrentPiece}
        context={context}
        setContext={setContext}
        getNextPiece={getNextPiece}
        gameOver={gameOver}
      />
    </>
  );
};

export default Game;
