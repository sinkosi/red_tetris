import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import { ConnectionContext } from "../context/ConnectionContext";
import Game from "./Game";

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

  useEffect(() => {
    connection.off("online-users").on("online-users", (users) => {
      setOnlineUsers(users);
    });

    connection.off("load-load").on("game-load", () => setGameLoaded(true));
  }, []);
  useEffect(() => {
    connection.emit("online-users-request");
  }, []);

  const loadGame = () => connection.emit("game-load-request");
  if (gameLoaded) return <Game setGameLoaded={setGameLoaded} />;
  else
    return (
      <>
        <Container>
          <Paper align="center" className={classes.root}>
            <Container maxWidth="sm">
              <Typography variant="h2" component="h1" align="center">
                The Waitingroom
              </Typography>{" "}
              <Typography variant="h6" component="h2" align="center">
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
      <div>
        {user.alias} [{user.isadmin ? "admin" : ""}] - ({user.score})
      </div>
    </>
  );
};

export default WaitingRoom;
