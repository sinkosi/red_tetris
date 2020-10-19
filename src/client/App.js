import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/Header";
import Game from "./components/Game";
import { params } from "../../params";
// import "./App.css";
// import Footer from "./components/Footer"

import io from "socket.io-client";
const { host, port } = params.server;

function App() {
  console.log({ params });
  const socket = io(`${host}:${port}`);

  socket.on("connect", (connection) => {
    console.log({ connection });
  });
  // const [socketConnection, setSocketConnection] = useState(null);

  return (
    <>
      <CssBaseline>
        <Header />
        <Game />
        {/* <Footer /> */}
      </CssBaseline>
    </>
  );
}

export default App;
