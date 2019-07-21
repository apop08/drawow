
//private internal functions outside the class so they
//cant be accessed outside
handleChatMessage = (io, socket) => {
    socket.on('chat message', function(msg){
        //send the msg out
        io.emit('chat message', msg);
      });
};

handleDisconnect = function(io, socket){
    socket.on('disconnect', function(){
        console.log('User Disconnected');
      });
};

handleUser = function(io, socket){
    socket.on('tradeUsername', function(user){
        socket.set("user", user);
        socket.get("user",(err, username) => console.log(`Welcome ${username}`));
        
      });
};
sendUser = function(io, socket){
  socket.emit('tradeUsername');
}
//public accessable functions go in here
class Logic{
    constructor(io){
        this.io = io;
    }
    initSocketEvents(){
      this.io.on('connection', function(socket){
        //console.log('a user connected');
      //on chat event
      const io = this.io;
      sendUser(io, socket);
        handleUser(io, socket);
        handleChatMessage(io, socket);
        handleDisconnect(io, socket);
      });
    }
}
module.exports = Logic;