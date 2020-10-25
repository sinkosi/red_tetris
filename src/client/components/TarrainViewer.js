import React, { useEffect, useRef, useState } from "react";
import { config } from "../misc/canvasConfig";
import CanvasGrid from "../misc/canvasGrid";

//import Swipeable from 'react-swipeable'

const TerrainViewer = (props) => {
  const canvasRef = useRef(null);
  const [grid, setGrid] = useState(null);
  const [context, setContext] = useState(null);

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
      }
    }
    return () => {};
  }, [context, grid, setGrid]);

  useEffect(() => {
    if (props.terrain && grid) {
      grid.coords = props.terrain;
      grid.draw();
    }
  }, [grid, props.terrain]);

  console.log(props);

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

export default TerrainViewer;
