const Player = require('./player');
const GameRoom = require('./gameroom');
class Lobby{
    constructor(io){
        this.io = io;
        this.players = [];
        this.games = []
        this.nextPId = 1;
        this.nextGId = 1;

    }
    newGame(){
        const newGame = new GameRoom(this.nextGId++)
        this.games.push(newGame);
        return newGame;
    }
    addPlayer(socket){
        this.player.push(new Player(socket, this.nextId++));
    }
    closeGame(gId){

    }
    removePlayer(Player){

    }
}
const lobby = new Lobby();
module.exports = lobby;