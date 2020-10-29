import io from "socket.io-client";
import { server } from "../../params";

const { host, port } = server;

const createNewConnection = (username, room, connection, setConnection) => {
  const ticket = { username };

  if (connection && connection.connected && connection.nsp === `/${room}`) {
    console.error("already connected to the right room");
    return [null, "connected"];
  }

  if (connection && connection.disconnect) connection.disconnect();

  const socket = io(`${host}:${port}/${room}`, { query: ticket });
  socket.on("connect", () => {
    setConnection(socket);
  });

  socket.on("error", (errmsg) => {
    console.error(errmsg);
    console.log(`${host}:${port}/${room}`, { query: ticket });

    connection.disconnect();
    const socket = io(`${host}:${port}/${room}`, { query: ticket });
    socket.on("connect", () => {
      setConnection(socket);
    });
  });
};

export default createNewConnection;
