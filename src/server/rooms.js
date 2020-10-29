import Room from "./Room";
import Game from "./Game";
import User from "./User";

const room = (io) => {
  const rooms = {};

  const workspaces = io.of(/^\/\w+$/);

  workspaces.on("connection", (socket) => {
    const workspace = socket.nsp;

    socket.on("disconnecting", () => {
      const room = rooms[workspace.name];

      console.log(`disconnecting user with id=${socket.id}`);

      socket ? room.removeUser(socket.id) : null;
      if (room.members.length === 0) delete rooms[room.id];
      else if (!room.admin) {
        room.chooseAdmin();

        workspace.emit("admin-change", room.admin);
      }

      console.log(rooms);
      workspace.emit(
        "online-users",
        rooms[workspace.name] ? rooms[workspace.name].members : []
      );
    });

    socket.on("online-users-request", () => {
      workspace.emit(
        "online-users",
        rooms[workspace.name] ? rooms[workspace.name].members : []
      );
    });

    socket.on("game-load-request", () => {
      let room = rooms[workspace.name];
      room.startGame();
      if (room.members.length === 1) {
        room.game.mode = "single-player";
        console.log("single player");
      }
      if (room.members.length > 1) room.game.mode = "multiplayer";
      workspace.emit("game-load", room.game.pieces);
    });

    socket.on("admin-status-request", () => {
      workspace.emit("admin-change", rooms[workspace.name].admin);
      console.log(socket.id);
    });

    socket.on("pieces-request", () => {
      console.log("poece request from " + socket.id);
      workspace.emit("new-pieces", rooms[workspace.name].game.generatePieces());
    });

    socket.on("terrain-update", (terrain) => {
      const room = rooms[workspace.name];
      room.member(socket.id).terrain = terrain;
      socket.broadcast.emit("terrain-update", room.members);
    });

    socket.on("rows-cleared", (numOfRows) => {
      ///some score calc in future
      console.log("reveived penalty request: ", numOfRows);
      socket.broadcast.emit("penalty", numOfRows);
    });

    socket.on("lost", () => {
      const room = rooms[workspace.name];
      const game = room.game;
      if (game.mode === "single-player") socket.emit("game-over");
      if (game.mode === "multiplayer") {
        console.log(game);
        room.memberLost(socket.id);
        if (room.game && room.game.status === "game-over") {
          console.log("emitting game-over");
          workspace.emit("game-over", game.winner);

          workspace.emit("online-users", room ? room.members : []);
        }

        console.log(game);
      }
    });

    workspace.emit("online-users", rooms[workspace.name].members);
    console.log(rooms);
  });

  // access control for this room
  workspaces.use((socket, next) => {
    const alias = socket.handshake.query.username;
    const socketId = socket.id;
    const roomId = socket.nsp.name;
    const room = rooms[roomId];
    if (!alias) {
      console.log("denying connection: username must be provided", { alias });
      next(new Error("username must be provided"));
    } else if (room && room.game && room.game.status === "in-progress") {
      console.log("denying connection: Game already in progress", { alias });
      next(new Error("Game in progress"));
    } else {
      /*****
       * Stuff that happens on a connection requests
       */

      console.log(`welcoming ${alias} to room ${roomId}`);
      if (room) {
        console.log("adding user to the already existing room");
        room.members.push(new User(alias, socketId));
      } else {
        console.log("Creating a new room");
        rooms[roomId] = new Room(roomId, null, alias, socketId);
      }
      next();
    }
  });
};

export default room;
