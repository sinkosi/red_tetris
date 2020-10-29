function User(alias, socketId) {
  this.alias = alias;
  this.socketId = socketId;
  this.score = 0;
  this.status = "not-in-game";
  this.isadmin = false;
}

export default User;
