const Player = require('./player');
const GameRoom = require('./gameroom');
class Lobby {
    constructor(io) {
        this.io = io;
        this.players = [];
        this.games = []
        this.nextPId = 1;
        this.nextGId = 1;
        const obj = this;
        this.io.on('connection', function (socket) {
            obj.addPlayer(socket);
        });
    }
    newGame() {
        const newGame = new GameRoom(this.nextGId++)
        this.games.push(newGame);
        this.dispatchRooms();
        return newGame;
    }
    addPlayer(socket) {
        const newPlayer = new Player(socket, this.nextId++);
        this.player.push(newPlayer);
        newPlayer.askName();
    }
    closeGame(gId) {

    }
    removePlayer(player) {
        let playerToRemove = -1;
        for (let i in this.players) {
            if (this.players[i].playerId === player.playerId) {
                playerToRemove = i;
            }
        }
        if (playerToRemove !== -1)
            this.players.splice(playerToRemove, 1);
        this.dispatchPlayers();
    }

    playerJoinRoom(player, id) {
        let gameToJoin = -1;
        for (let i in this.games) {
            if (this.games[i].gId === id) {
                gameToJoin = i;
            }
        }
        if (gameToJoin !== -1)
            this.games[gameToJoin].addPlayer(player);
    }

    dispatchRooms(socket = null) {
        const arr = this.games.map((e) => e.games.gId);
        if (socket)
            socket.emit("room list", arr);
        else
            this.io.emit("room list", arr);
    }

    dispatchPlayers(socket = null) {
        const arr = this.players.map((e) => e.socket.user);
        if (socket)
            socket.emit("global player list", arr);
        else
            this.io.emit("global player list", arr);
    }
}
const lobby = new Lobby();
module.exports = lobby;