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

const WaitingRoom = (props) => {
  const classes = useStyles();
  console.log(props);
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
                className={classes.formControl}
                // onClick={start}
              >
                Start the game
              </Button>
            ) : (
              <Typography variant="h6" component="h2" align="center">
                waiting for admin to start the game
              </Typography>
            )}
          </Container>
        </Paper>
      </Container>
    </>
  );
};

export default WaitingRoom;
