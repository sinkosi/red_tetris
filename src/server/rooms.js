function User(alias, socketId) {
  this.alias = alias;
  this.socketId = socketId;
  this.score = 0;
  this.isadmin = false;
}

function Room(roomId, admin = "", alias = "", socketId = "") {
  this.id = roomId;
  this.admin = admin;
  this.members = [];
  this.game = new Game();

  this.members.push(new User(alias, socketId));
  this.admin = this.members[0];
  this.admin.isadmin = true;

  this.removeUser = function (socketId) {
    let i = 0;
    while (this.members[i] && this.members[i].socketId != socketId) i++;
    if (this.members[i] && this.members[i].socketId === socketId) {
      this.members[i] = null;
      this.members.splice(i, 1);

      if (this.admin.socketId === socketId) this.admin = null;
    }
    if (this.members.length === 0)
      console.log("should now delete room ", this.id);
    else if (!this.admin) console.log("should now assign a new admin");
  };

  this.chooseAdmin = function () {
    if (this.members.length > 0) {
      let newNumber = Math.floor(Math.random() * this.members.length);

      this.admin = this.members[newNumber];
      this.admin.isadmin = true;
    }
  };
}

function Game() {
  this.status = "waiting";

  this.start = function () {
    this.status = "in-progress";
    this.generatePieces();
  };

  this.pieces = [];
  this.generatePieces = function () {
    let newPieces = [];
    for (let i = 0; i < 100; i++) {
      let pieceNum = Math.floor(Math.random() * 7);
      let pieceVariant = Math.floor(Math.random() * 4);
      newPieces.push([pieceNum, pieceVariant]);
    }
    console.log(newPieces);
    this.pieces.concat(newPieces);
  };
}

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
      workspace.emit("game-load");
    });

    socket.on("admin-status-request", () => {
      workspace.emit("admin-change", rooms[workspace.name].admin);
      console.log(socket.id);
    });
    workspace.emit("online-users", rooms[workspace.name].members);
    workspace.emit("welcome to the room");
    console.log(rooms);
  });

  // access control for this room
  workspaces.use((socket, next) => {
    const alias = socket.handshake.query.username;
    const socketId = socket.id;
    const roomId = socket.nsp.name;
    if (!alias) {
      console.log("denying connection...", { alias });
      next(new Error("username must be provided"));
    } else {
      /*****
       * Stuff that happens on a connection requests
       */

      console.log(`welcoming ${alias} to room ${roomId}`);
      if (rooms[roomId]) {
        console.log("adding user to the already existing room");
        rooms[roomId].members.push(new User(alias, socketId));
      } else {
        console.log("Creating a new room");
        rooms[roomId] = new Room(roomId, null, alias, socketId);
      }
      next();
    }
  });
};

export default room;
