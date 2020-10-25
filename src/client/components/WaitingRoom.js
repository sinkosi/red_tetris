import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import { ConnectionContext } from "../context/ConnectionContext";
import Game from "./Game";
import { useHistory } from "react-router-dom";
// import { Avatar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    textAlign: "center",
  },
}));

const WaitingRoom = (props) => {
  const { connection } = useContext(ConnectionContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const classes = useStyles();
  const [gameLoaded, setGameLoaded] = useState(false);
  const history = useHistory();
  const [initialPieces, setInitialPieces] = useState([]);

  useEffect(() => {
    const pathname = history.location.pathname;
    const [room, username] = pathname.replace(/[\]|/]/g, "").split("[");

    if (props.username != username) props.setUsername(username);
    if (props.room != room) props.setRoom(room);
  }, [props.username, props.room]);

  useEffect(() => {
    connection.off("online-users").on("online-users", (users) => {
      setOnlineUsers(users);
    });

    connection.off("terrain-update").on("terrain-update", (users) => {
      setOnlineUsers(users);
    });

    connection.off("game-load").on("game-load", (piecesArr) => {
      //pieces array
      setInitialPieces(piecesArr);
      setGameLoaded(true);
    });
  }, []);
  useEffect(() => {
    connection.emit("online-users-request");
  }, []);

  useEffect(() => {
    if (gameLoaded) props.setInGame(true);
    else props.setInGame(false);
  }, [gameLoaded]);

  const loadGame = () => connection.emit("game-load-request");
  if (gameLoaded) {
    // props.setInGame(true);
    return (
      <Game
        setGameLoaded={setGameLoaded}
        onlineUsers={onlineUsers}
        handleInGameTabChange={props.handleInGameTabChange}
        inGameTab={props.inGameTab}
        initialPieces={initialPieces}
      />
    );
  } else
    return (
      <>
        <Container>
          <Paper align="center" className={classes.root}>
            <Container maxWidth="sm">
              <Typography variant="h2" component="h1" align="center">
                Waiting room
              </Typography>{" "}
              <Typography variant="body2" component="h2" align="center">
                while waiting for the waitress, are you a waiter?
              </Typography>
              <Typography variant="h6" component="h2" align="center">
                Room ID: {props.room}
              </Typography>
              {props.admin ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={loadGame}
                >
                  Start the game
                </Button>
              ) : (
                <Typography variant="h6" component="h2" align="center">
                  waiting for admin to start the game
                </Typography>
              )}
              <OnlineUsers users={onlineUsers} />
            </Container>
          </Paper>
        </Container>
      </>
    );
};

const OnlineUsers = ({ users }) => {
  return (
    <>
      <Paper variant="outlined">
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </Paper>
    </>
  );
};

const User = ({ user }) => {
  return (
    <>
      <Paper
        variant="outlined"
        style={{ margin: "0.5rem 3rem", padding: "0.5rem" }}
      >
        {user.alias} [{user.isadmin ? "admin" : ""}] - ({user.score})
      </Paper>
    </>
  );
};

export default WaitingRoom;
