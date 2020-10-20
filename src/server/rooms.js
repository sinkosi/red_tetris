const room = (io) => {
  const rooms = { room1: { admin: "", members: [] }, room2: {} };

  const workspaces = io.of(/^\/\w+$/);

  workspaces.on("connection", (socket) => {
    const workspace = socket.nsp;
    socket.on("disconnecting", () =>
      console.log(`disconnecting user with id=${socket.id}`)
    );

    console.log("new user connected");
    workspace.emit("welcome to the room");
  });

  // access control for this room
  workspaces.use((socket, next) => {
    const username = socket.handshake.query.username;
    if (!username) {
      console.log("denying connection...");
      next(new Error("must be logged in to connect to chats"));
    } else {
      /*****
       * Stuff that happens on a connection requests
       */

      console.log(`welcoming ${username} to room ${socket.nsp.name}`);
      next();
    }
  });
};

export default room;
