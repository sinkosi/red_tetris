import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { ConnectionContext } from "../context/ConnectionContext";
import { useHistory } from "react-router-dom";

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
  const { connection } = useContext(ConnectionContext);
  const history = useHistory();
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
    if (validated()) {
      // createNewConnection(
      //   username.value,
      //   room.value,
      //   connection,
      //   setConnection
      // );
      history.push(`/${room.value}[${username.value}]`);
    }
  };

  const validateUsername = () => {
    const regex = /[a-zA-Z0-9_-]{3,16}$/;
    const u = username;
    const message =
      "Can only contain letters, numbers, hyphen (-) and underscore (_). No spaces. 3 characters min";

    if (!regex.test(u.value)) {
      u.error = true;
      u.msg = message;
    } else {
      u.error = false;
      u.msg = "";
    }
    setUsername(u);
    return !u.error;
  };

  useEffect(() => {
    validateUsername();
    // console.log("validateUsername has ran with", username);
  }, [username]);

  const validateRoom = () => {
    const regex = /[a-zA-Z0-9_-]{3,16}$/;
    const message =
      "Can only contain letters, numbers, hyphen (-) and underscore (_). No spaces.";
    const r = room;
    if (!regex.test(room.value)) {
      r.error = true;
      r.msg = message;
    } else {
      r.error = false;
      r.msg = "";
    }
    setRoom(() => setRoom(r));
    return !r.error;
  };

  const validated = () => {
    if (validateUsername() && validateRoom()) {
      props.setUsername(username.value);
      props.setRoom(room.value);
      return true;
    } else return false;
  };

  const handleChangeUsername = (event) => {
    const value = `${event.target.value}` + "";
    setUsername({ ...username, value });
  };
  const handleChangeRoom = (event) => {
    const value = `${event.target.value}`;
    setRoom({ ...room, value });
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
              onChange={handleChangeRoom}
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
