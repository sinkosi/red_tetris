import React from "react";
import ReactDom from "react-dom";
import App from "./App";

ReactDom.render(
  <App message={"An amazing tetris in its way. stay put for more"} />,
  document.getElementById("tetris")
);
