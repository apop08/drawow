handleChatMessage = function(io, socket){
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

handleConnection = function(io, socket){
    socket.on('playerConnected', function(user){
        console.log(`${user} Disconnected`);
      });
};

class Logic{
    constructor(io){
        this.io = io;
        this.io.on('connection', function(socket){
            console.log('a user connected');
          //on chat event
            handleConnection(io, socket);
            handleChatMessage(io, socket);
            handleDisconnect(io, socket);
          });
    }
}
module.exports = Logic;