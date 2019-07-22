
//private internal functions outside the class so they
//cant be accessed outside
handleChatMessage = (io, socket) => {
  socket.on('chat message', function (msg) {
    //send the msg out
    io.emit('chat message', msg);
  });
};

handleDisconnect = function (io, socket, obj) {
  socket.on('disconnect', function () {
    console.log(`${socket.user} disconnected`);
    const index = obj.users.indexOf(socket.user);
    if(index > -1) obj.users.splice(index, 1);
    io.emit('userList', obj.users);
    console.log(obj.users);
  });
};

handleUser = function (io, socket, obj) {
  socket.on('tradeUsername', function (user) {
    console.log("handleuser");
    //console.log(socket);
    socket.user = user;
    obj.users.push(user);
    console.log(`Welcome ${socket.user}`);
    console.log(obj.users);
    io.emit('userList', obj.users);
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

startGame = function (io, socket, obj) {
  socket.on('start', function () {
    console.log('----------------------');
    
    console.log(obj);
    console.log('----------------------');
    //send the msg out
    const drawer = obj.init();
    console.log(`${drawer} will be drawing`)
    io.emit('startGame', drawer);

  });
}

//public accessable functions go in here
class Logic {
  constructor(io, gameobj) {
    this.io = io;
    this.gameobj = gameobj
    this.gameobj.users = [];

  }


  initSocketEvents() {
    let obj = this.gameobj;

    
    this.io.on('connection', function (socket) {
      console.log('a user connected');
      //on chat event
      const io = obj.io;
      sendUser(io, socket);
      sendDraw(io, socket);
      handleUser(io, socket, obj);
      handleChatMessage(io, socket);
      handleDisconnect(io, socket, obj);
      startGame(io, socket, obj);
      
    });


  }
}
module.exports = Logic;