const Player = require('./player');
const GameRoom = require('./gameroom');

class Lobby {
    constructor(io) {
        this.words = (require("./wordBank.json")).words.split(' ');

        this.players = [];
        this.games = []
        this.nextPId = 1;
        this.nextGId = 1;
        this.io = io;
        const obj = this;
        this.io.on('connection', function (socket) {
            //todo reconnection
            obj.addPlayer(socket);
        });
        //this.newGame();
    }
    newGame() {
        const newGame = new GameRoom(this.nextGId++, this)
        this.games.push(newGame);
        //console.log(this.games);
        this.dispatchRooms();
        return newGame;
    }
    addPlayer(socket) {
        const newPlayer = new Player(socket, this.nextId++, this);
        this.players.push(newPlayer);
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
        
        const arr = this.games.map((e) => ({gId: e.gId, state: e.state}));
        console.log(arr);
        if (socket)
            socket.emit('roomlist', arr);
        else {
            console.log('emit to all');
            //console.log(this.io);
            this.io.emit('roomlist', arr);
        }
    }
    randomWord(){
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
    dispatchPlayers(socket = null) {
        const arr = this.players.map((e) => e.socket.user);
        if (socket)
            socket.emit("global player list", arr);
        else
            this.io.emit("global player list", arr);
    }
}

module.exports = Lobby;