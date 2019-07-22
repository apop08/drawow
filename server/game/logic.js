
//private internal functions outside the class so they
//cant be accessed outside
handleChatMessage = (io, socket) => {
  socket.on('chat message', function (msg) {
    //send the msg out
    io.emit('chat message', msg);
  });
};

handleDisconnect = function (io, socket) {
  socket.on('disconnect', function () {
    console.log(`${socket.user} disconnected`);
  });
};

handleUser = function (io, socket) {
 
  socket.on('tradeUsername', function (user) {
    console.log("handleuser");
    console.log(socket);
    socket.user = user;
    console.log(`Welcome ${socket.user}`);

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
  }
  initSocketEvents() {
    this.io.on('connection', function (socket) {
      console.log('a user connected');
      //on chat event
      const io = this.io;
      sendUser(io, socket);
      sendDraw(io, socket);
      handleUser(io, socket);
      handleChatMessage(io, socket);
      handleDisconnect(io, socket);
    });
  }
}
module.exports = Logic;