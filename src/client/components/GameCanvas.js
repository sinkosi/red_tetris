import React, { useContext, useEffect, useRef } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import { config } from "../misc/canvasConfig";
import CanvasGrid from "../misc/canvasGrid";

//import Swipeable from 'react-swipeable'

const GameCanvas = ({
  grid,
  currentPiece,
  setCurrentPiece,
  setGrid,
  gameOver,
  // setGameOver,
  context,
  setContext,
  getNextPiece,
}) => {
  const canvasRef = useRef(null);
  const { connection } = useContext(ConnectionContext);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx) {
        setContext(renderCtx);
      }
    }
  }, [context, setContext]);

  useEffect(() => {
    if (context) {
      if (!grid) {
        let gr = new CanvasGrid(context);
        gr.init();
        setGrid(gr);
      } else {
        // console.log("grid already exist")
        // grid.draw()
        if (!currentPiece) {
          console.log("request for a new piece");
          getNextPiece();
        }
      }
    }
    return () => {};
  }, [context, grid, currentPiece, setCurrentPiece, setGrid, getNextPiece]);

  useEffect(() => {
    if (grid) connection.emit("terrain-update", grid.coords);
  }, [grid]);
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        if (currentPiece)
          if (!currentPiece.moveDown()) {
            currentPiece.lock();
            let numOfRemovedLines = grid.removeFilledLines();

            grid.draw();
            getNextPiece();
            connection.emit("terrain-update", grid.coords);
            if (numOfRemovedLines) {
              console.log("emmiting penalties: ", numOfRemovedLines);
              connection.emit("rows-cleared", numOfRemovedLines);
            }
          }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    currentPiece,
    context,
    grid,
    gameOver,
    // setGameOver,
    setCurrentPiece,
    setContext,
    getNextPiece,
  ]);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        width={config.COLS * config.BLOCK}
        height={config.ROWS * config.BLOCK}
        style={{
          border: "2px solid #000",
          marginTop: 10,
        }}
      ></canvas>
    </div>
  );
};

export default GameCanvas;
