import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";
import { server } from "../../../params";
import { ConnectionContext } from "../context/ConnectionContext";

const { host, port } = server;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    textAlign: "center",
  },
}));

const GameMenu = (props) => {
  const classes = useStyles();
  const { connection, setConnection } = useContext(ConnectionContext);
  const [username, setUsername] = useState({
    value: props.username,
    error: false,
    msg: "",
  });
  const [room, setRoom] = useState({
    value: props.room,
    error: false,
    msg: "",
  });

  const enterRoom = () => {
    const ticket = { username: username.value };

    if (validated()) {
      const socket = io(`${host}:${port}/${room.value}`, { query: ticket });
      socket.on("connect", () => {
        socket.on("welcome to the room", () => {
          setConnection(() => setConnection(socket));
          console.log("next step");
          props.setUsername(username);
          props.setRoom(room);
        });
      });
    }
  };

  const validateUsername = (old = username) => {
    console.log("duty calls", username);
    const regex = /[a-zA-Z0-9_-]{3,16}$/;
    const message =
      "Can only contain letters, numbers, hyphen (-) and underscore (_). No spaces.";

    if (!regex.test(username)) {
      old.error = true;
      old.msg = message;
    } else {
      old.error = false;
      old.msg = "";
    }
    setUsername(() => setUsername(old));
    return !old.error;
  };
  const validated = () => {
    setRoom((room) => setRoom(room));
    return validateUsername;
  };
  console.log(username);

  const handleChangeUsername = (event) => {
    const value = `${event.target.value}`;
    setUsername({ ...username, value });
    // validateUsername();
  };
  return (
    <>
      <Container>
        <Paper align="center" className={classes.root}>
          <Container maxWidth="sm">
            <Typography variant="h2" component="h1" align="center">
              RedTetris
            </Typography>{" "}
            <Typography variant="h6" component="h2" align="center">
              It is just like tetris - but it's red
            </Typography>
            <Typography variant="h6" component="h2" align="center">
              You are {connection ? "online" : "offline"}
            </Typography>
            <TextField
              id="alias"
              label="Username / Alias"
              fullWidth
              className={classes.formControl}
              required
              value={username.value}
              onChange={handleChangeUsername}
              error={username.error}
              helperText={username.msg}
            />
            <TextField
              id="room"
              label="Room Id"
              fullWidth
              className={classes.formControl}
              align="center"
              helperText="leave blank / empty to create a new room"
              value={room.value}
              error={room.error}
              //   helperText={room.msg}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.formControl}
              onClick={enterRoom}
            >
              Enter a room
            </Button>
          </Container>
        </Paper>
      </Container>
    </>
  );
};

export default GameMenu;
