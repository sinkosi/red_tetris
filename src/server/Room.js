import Game from "./Game";
import User from "./User";

function Room(roomId, admin = "", alias = "", socketId = "") {
  this.id = roomId;
  this.admin = admin;
  this.members = [];
  this.game = null;
  this.terrain = null;

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

  this.member = function (socketId) {
    for (let i = 0; i < this.members.length; i++) {
      if (this.members[i].socketId === socketId) return this.members[i];
    }
  };

  this.chooseAdmin = function () {
    if (this.members.length > 0) {
      let newNumber = Math.floor(Math.random() * this.members.length);

      this.admin = this.members[newNumber];
      this.admin.isadmin = true;
    }
  };

  this.startGame = function () {
    this.game = new Game();
    this.game.start();
    this.members.forEach((member) => {
      member.status = "playing";
    });
  };

  this.memberLost = function (socketId) {
    this.member(socketId).status = "lost";

    let membersStillPlaying = 0;

    this.members.forEach((member) => {
      if (member.status === "playing") membersStillPlaying++;
    });

    if (membersStillPlaying === 1) {
      this.game.status = "game-over";

      this.members.forEach((member) => {
        if (member.status === "playing") this.game.winner = member;
      });

      this.members.forEach((member) => {
        member.terrain === null;
      });
    }
  };
}

export default Room;
