
//private internal functions outside the class so they
//cant be accessed outside
handleChatMessage = (io, socket) => {
  socket.on('chat message', function (msg) {
    //send the msg out
    io.emit('chat message', msg);
  });
};

handleDisconnect = function (io, socket, users) {
  socket.on('disconnect', function () {
    console.log(`${socket.user} disconnected`);
    const index = users.indexOf(socket.user);
    if(index > -1) users.splice(index, 1);
    console.log(users);
  });
};

handleUser = function (io, socket, users) {
  socket.on('tradeUsername', function (user) {
    console.log("handleuser");
    //console.log(socket);
    socket.user = user;
    users.push(user);
    console.log(`Welcome ${socket.user}`);
    console.log(users);
  });
};
sendUser = function (io, socket) {
  console.log("ask for user name");
  
  socket.emit('tradeUsername');
}
sendDraw = function (io, socket) {
  socket.on('drawing', function (img) {
    //send the msg out
    io.emit('drawing', img);
  });
}


//public accessable functions go in here
class Logic {
  constructor(io) {
    this.io = io;
    this.users = [];

  }

  
  initSocketEvents() {
    let obj = this;
    this.io.on('connection', function (socket) {
      console.log('a user connected');
      //on chat event
      const io = obj.io;
      sendUser(io, socket);
      sendDraw(io, socket);
      handleUser(io, socket, obj.users);
      handleChatMessage(io, socket);
      handleDisconnect(io, socket, obj.users);
    });
  }
}
module.exports = Logic;