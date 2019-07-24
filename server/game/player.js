class Player{
    constructor(socket, playerId)
    {
        this.playerId = playerId;
        this.socket = socket;
        this.state = 'lobby';
        this.gameId = 0;
        this.isDrawing = false;
    }
    joinRoom(game){
        this.state = 'waiting';
        this.gameId = game.id;
        this.socket.join(this.gameId);
    }
    leaveRoom(){
        this.state = lobby;
        this.socket.leave(this.gameId);
        this.gameId = 0;
    }
    sendTo(type, obj){
        this.socket.emit(type, obj);
    }
    startGame(){
        e.state = 'playing';
    }
    setDrawer()
    {
        this.isDrawing = true;
        this.socket.emit('your drawing');
    }
}
module.exports = Player