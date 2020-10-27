import React, { useContext, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import { ConnectionContext } from "../context/ConnectionContext";
import controls from "../misc/controls";
import { newPiece } from "../misc/Piece";
import GameCanvas from "./GameCanvas";
import {
  Box,
  Container,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import TerrainViewer from "./TarrainViewer";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));

const Game = (props) => {
  const theme = useTheme();
  const [gameOver, setGameOver] = useState(false);
  const [grid, setGrid] = useState(null);
  const [currentPiece, setCurrentPiece] = useState(null);
  const [piecesArr, setPiecesArr] = useState(props.initialPieces);
  const [nextPiece, setNextPiece] = useState(null);
  const [context, setContext] = useState(null);

  const { connection } = useContext(ConnectionContext);

  useEffect(() => {
    let [pieceNum, pieceVariant] = piecesArr[0];
    piecesArr.splice(0, 1);
    setNextPiece(newPiece(pieceNum, pieceVariant));
  }, []);

  useEffect(() => {
    props.setInGameTab(0);
    return () => {
      setGrid(null);
      setContext(null);
      console.log("deleting grid and context....");
    };
  }, []);
  useEffect(() => {
    connection.off("new-pieces").on("new-pieces", (pieces) => {
      setPiecesArr(piecesArr.concat(pieces));
    });

    connection.off("penalty").on("penalty", (num) => {
      for (let i = 0; i < num; i++) {
        grid.penalty(currentPiece);
      }
    });

    connection.off("game-over").on("game-over", (winner) => {
      props.setLastWinner(winner);
      props.setGameLoaded(false);
    });
  }, [grid, currentPiece]);

  const getNextPiece = () => {
    let next = nextPiece;
    next.context = context;
    next.grid = grid;

    next.draw();
    setCurrentPiece(next);

    if (next.isCollision()) {
      setGameOver(true);
      connection.emit("lost");
      next.lock();
    }
    let [pieceNum, pieceVariant] = piecesArr[0];
    piecesArr.splice(0, 1);
    setNextPiece(newPiece(pieceNum, pieceVariant));
    if (piecesArr.length < 3) {
      connection.emit("pieces-request");
    }
    return next;
  };

  useEffect(() => {
    const handleKeyPress = ({ key }) =>
      controls(key, currentPiece, grid, context);
    if (currentPiece) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentPiece, grid, context]);

  return (
    <>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={props.inGameTab}
        onChangeIndex={props.handleInGameTabChange}
      >
        <Container maxWidth="sm">
          <Paper align="center">
            <GameCanvas
              setGameOver={setGameOver}
              grid={grid}
              setGrid={setGrid}
              currentPiece={currentPiece}
              setCurrentPiece={setCurrentPiece}
              context={context}
              setContext={setContext}
              getNextPiece={getNextPiece}
              gameOver={gameOver}
            />
          </Paper>
        </Container>
        <Container maxWidth="sm">
          <Paper align="center">
            <Peek onlineUsers={props.onlineUsers} />
          </Paper>
        </Container>
      </SwipeableViews>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Peek = ({ onlineUsers }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { connection } = useContext(ConnectionContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log({ onlineUsers });
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {onlineUsers.map((user) =>
          user.socketId === connection.id ? (
            <></>
          ) : (
            <Tab key={user.socketId} label={user.alias} />
          )
        )}
      </Tabs>
      {onlineUsers.map((user, i) => (
        <TabPanel key={user.socketId} value={value} index={i}>
          <TerrainViewer terrain={user.terrain} />
        </TabPanel>
      ))}
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Game;
