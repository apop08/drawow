const Player = require('./player');
const Looby = require('./lobbyc')
class GameRoom{
    constructor(gId){
        this.gId = gId;
        this.players = [];
        this.state = 'waiting';
    }
    addPlayer(player){
        this.player.push(player);
        player.joinRoom(this);
    }
    removePlayer(player){
    }
    startGame(){
        this.state = 'playing';
        this.players.forEach(e => {
            e.startGame();
        });
    }
    closeGame(){
        this.players.forEach(e => {
            e.startGame();
        });
    }
}

module.exports = GameRoom;