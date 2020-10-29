import React, { useEffect, useState } from "react";
import {
  Route,
  HashRouter as Router,
  Redirect,
  Switch,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/Header";
import GameMenu from "./components/GameMenu";
import WaitingRoom from "./components/WaitingRoom";
import { ConnectionContext } from "./context/ConnectionContext";
import useCookie from "./hooks/useCookie";
import createNewConnection from "./createNewConnection";

function App() {
  const [connection, setConnection] = useState({});
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useCookie("username");
  const [room, setRoom] = useCookie("room");
  const [admin, setAdmin] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [inGameTab, setInGameTab] = useState(0);
  // const [members, setMembers] = useState([]);

  useEffect(() => {
    createNewConnection(username, room, connection, setConnection);
  }, [room]);

  useEffect(() => {
    if (connection.connected) setLoading(false);

    return () => {};
  }, [connection]);

  useEffect(() => {
    if (connection.connected) {
      connection.off("admin-change").on("admin-change", (admin) => {
        if (admin && admin.socketId === connection.id) setAdmin(true);
        else setAdmin(false);
      });
    }

    return () => {};
  }, [connection]);

  useEffect(() => {
    if (connection.connected) connection.emit("admin-status-request");
  }, [connection]);

  const handleInGameTabChange = (event, newValue) => {
    setInGameTab(newValue);
  };

  if (loading) return <Loading />;
  return (
    <>
      <CssBaseline>
        <ConnectionContext.Provider value={{ connection, setConnection }}>
          <Router hashType="noslash">
            <Header
              inGame={inGame}
              newTab={handleInGameTabChange}
              inGameTab={inGameTab}
            />
            <Switch>
              <Route exact path="/">
                <GameMenu
                  username={username}
                  setUsername={setUsername}
                  room={room}
                  setRoom={setRoom}
                />
              </Route>
              <Route path="/:roomId[:userId]">
                <WaitingRoom
                  room={room}
                  setRoom={setRoom}
                  username={username}
                  setUsername={setUsername}
                  admin={admin}
                  setInGame={setInGame}
                  handleInGameTabChange={handleInGameTabChange}
                  inGameTab={inGameTab}
                  setInGameTab={setInGameTab}
                />
              </Route>
              <Route path="/">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </ConnectionContext.Provider>
      </CssBaseline>
    </>
  );
}

const Loading = () => {
  return (
    <>
      <CssBaseline>
        <Header />
        <div>Loading...</div>
      </CssBaseline>
    </>
  );
};
export default App;
