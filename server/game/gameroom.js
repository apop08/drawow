//const Player = require('./player');
class GameRoom {
    constructor(gId, Lobby) {
        this.gId = gId;
        this.players = [];
        this.state = 'waiting';
        this.drawer = null;
        //this.room = Lobby.io.in(this.gId);
        this.Lobby = Lobby;
    }
    addPlayer(player) {
        this.players.push(player);
        player.joinRoom(this);
        this.dispatchGamePlayerList();
    }
    removePlayer(player) {
        let playerToRemove = -1;
        for(let i in this.players){
            if(this.players[i].playerId === player.playerId){
                playerToRemove = i;
            }
        }
        if(playerToRemove !== -1)
            this.players.splice(playerToRemove, 1);
        this.dispatchGamePlayerList();
        this.Lobby.removePlayer(player);
    }
    startGame() {
        this.state = 'playing';
        this.players.forEach(e => {
            e.startGame();
        });


        const idx = Math.floor(Math.random() * this.players.length);
        this.drawer = this.players[idx].socket.user;
        this.players[idx].setDrawer();
    }
    closeGame() {
        this.players.forEach(e => {
            e.startGame();
        });
    }
    dispatchDrawing(img) {
        this.Lobby.io.in(this.gId).emit('drawing', img)
    }
    dispatchChat(msg) {
        this.Lobby.io.in(this.gId).emit('chat message', msg)
    }
    dispatchStart(){
        this.startGame();
        this.Lobby.io.in(this.gId).emit('start game', this.drawer)
    }
    dispatchGamePlayerList(){
        const arr = this.players.map((e) => e.socket.user);
        this.Lobby.io.in(this.gId).emit('game player list', arr);
    }
}

module.exports = GameRoom;