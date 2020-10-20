import React, { useEffect, useState } from "react";
import { Route, HashRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/Header";
import Game from "./components/Game";
import GameMenu from "./components/GameMenu";
import WaitingRoom from "./components/WaitingRoom";
// import SocketHandler from "./components/SocketHandler";

import { server } from "../../params";

import io from "socket.io-client";
import { ConnectionContext } from "./context/ConnectionContext";
const { host, port } = server;

function App() {
  const [connection, setConnection] = useState({ connected: false });
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("room1");
  const [admin] = useState(false);
  // const [members, setMembers] = useState([]);

  // console.log({ connection });

  useEffect(() => {
    const socket = io(`${host}:${port}`);
    socket.on("connect", () => {
      console.log("connection:", socket);
      setConnection(() => setConnection(socket));
    });

    return () => {
      console.log("cleanupconnection");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (connection.on)
      connection.on("admin-change", (adminId) => console("new admin", adminId));
    return () => {};
  }, [connection]);

  return (
    <>
      <CssBaseline>
        <ConnectionContext.Provider value={{ connection, setConnection }}>
          <Router hashType="noslash">
            <Header />
            {/* <SocketHandler /> */}
            <Route path="/game">
              <Game />
            </Route>
            <Route exact path="/">
              <GameMenu
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
              />
            </Route>
            <Route path="/:roomId[:userId]">
              <WaitingRoom room={room} username={username} admin={admin} />
            </Route>
          </Router>
        </ConnectionContext.Provider>
      </CssBaseline>
    </>
  );
}

export default App;
