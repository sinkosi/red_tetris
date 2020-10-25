import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import { Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  gameTabs: {
    flexGrow: 1,
  },
}));
const Header = (props) => {
  const classes = useStyles();
  let history = useHistory();

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push("/")}
          >
            RedTetris
          </Typography>
          {props.inGame ? (
            <Tabs
              className={classes.gameTabs}
              value={props.inGameTab}
              indicatorColor="secondary"
              // textColor="primary"
              onChange={props.newTab}
              aria-label="tabs for switching between game and peek-mode"
            >
              <Tab label="Game" />
              <Tab label="Peek" /> hi
            </Tabs>
          ) : (
            <></>
          )}

          <Button color="inherit" onClick={() => history.push("/game")}>
            Game
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
