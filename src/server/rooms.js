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

const room = (io) => {
  const rooms = {};

  const workspaces = io.of(/^\/\w+$/);

  workspaces.on("connection", (socket) => {
    const workspace = socket.nsp;
    socket.on("disconnecting", () => {
      console.log(`disconnecting user with id=${socket.id}`);
      console.log(workspace.name);
      const room = rooms[workspace.name];
      room.removeUser(socket.id);
      if (room.members.length === 0) delete rooms[workspace.name];
      else if (!room.admin) {
        room.chooseAdmin();

        workspace.emit("admin-change", room.admin);
      }

      console.log(rooms);
    });

    console.log("new user connected");
    workspace.emit("welcome to the room");
    console.log(rooms);
  });

  // access control for this room
  workspaces.use((socket, next) => {
    const alias = socket.handshake.query.username;
    const socketId = socket.id;
    const roomId = socket.nsp.name;
    if (!alias) {
      console.log("denying connection...");
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
