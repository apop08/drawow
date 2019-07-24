//const Player = require('./player');
const Lobby = require('./lobby')
class GameRoom {
    constructor(gId) {
        this.gId = gId;
        this.players = [];
        this.state = 'waiting';
        this.drawer = null;
        this.room = Lobby.io.to(this.gId);
    }
    addPlayer(player) {
        this.players.push(player);
        player.joinRoom(this);
        this.dispatchList();
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
        this.dispatchList();
        Lobby.removePlayer(player);
    }
    startGame() {
        this.state = 'playing';
        this.players.forEach(e => {
            e.startGame();
        });


        const idx = Math.floor(Math.random() * this.players.length);
        this.drawer = this.players[idx];
        this.drawer.setDrawer();
    }
    closeGame() {
        this.players.forEach(e => {
            e.startGame();
        });
    }
    dispatchDrawing(img) {
        this.room.emit('drawing', img)
    }
    dispatchChat(msg) {
        this.room.emit('chat message', msg)
    }
    dispatchStart(){
        this.startGame();
        this.room.emit('start game', this.drawer)
    }
    dispatchList(){
        const arr = this.players.map((e) => e.socket.user);
        this.room.emit('game player list', arr);
    }
}

module.exports = GameRoom;