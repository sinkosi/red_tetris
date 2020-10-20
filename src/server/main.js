import params from "../../params";
import * as server from "./index";
import room from "./rooms";
server.create(params.server).then((x) => {
  room(x.io);
  console.log("not yet ready to play tetris with U. Next time?");
});
