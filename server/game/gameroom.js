//const Player = require('./player');

class GameRoom {
    constructor(gId, Lobby) {
        this.gId = gId;
        this.players = [];
        this.state = 'waiting';
        this.drawer = null;
        this.drawerIdx = 0;
        //this.room = Lobby.io.in(this.gId);
        this.Lobby = Lobby;
        this.turns = 4;
    }
    addPlayer(player) {
        this.players.push(player);
        player.joinRoom(this);
        this.dispatchGamePlayerList();
    }
    removePlayer(player) {
        this.removePlayerFromArray(player.playerId)
        this.Lobby.removePlayer(player);
    }
    removePlayerFromArray(pid) {
        let playerToRemove = -1;
        for (let i in this.players) {
            if (this.players[i].playerId === pid) {
                playerToRemove = i;
            }
        }
        if (playerToRemove !== -1)
            this.players.splice(playerToRemove, 1);
        if (this.players.length == 0) {
            this.Lobby.closeGame(this.gId);
        }
        this.dispatchGamePlayerList();
    }
    getRandomWord() {
        return this.Lobby.randomWord();
    }
    startGame() {
        this.state = 'playing';
        this.word = this.getRandomWord()
        this.players.forEach(e => {
            e.startGame();
        });


        //const idx = Math.floor(Math.random() * this.players.length);
        this.drawer = this.players[this.drawerIdx].socket.user;
        this.players[this.drawerIdx].setDrawer();
        this.Lobby.dispatchRooms();
    }
    closeGame() {
        this.players.forEach(e => {
            e.leaveRoom();
        });
        this.Lobby.closeGame(this.gId);
    }
    dispatchDrawing(img) {
        this.Lobby.io.in(this.gId).emit('drawing', img);
    }
    dispatchChat(msg) {
        this.Lobby.io.in(this.gId).emit('chat message', msg);
    }
    dispatchStart() {
        if (this.players.length > 1) {
            this.startGame();
            console.log(`${this.word}  ${this.drawer}`);
            this.Lobby.io.in(this.gId).emit('start game', ({ drawer: this.drawer, word: this.word }));
            setTimeout((obj) => {
                obj.Lobby.io.in(obj.gId).emit('begin');
                setTimeout((obj2) => {
                    obj2.dispatchPost();
                }, 60500, obj)
            }, 5500, this);
        }
    }
    dispatchPost() {
        this.Lobby.io.in(this.gId).emit('post game');
        if (++this.drawerIdx >= this.players.length) {
            setTimeout((obj) => {
                obj.closeGame();
            }, 15500, this);
        }
        else {
            setTimeout((obj) => {
                obj.dispatchStart();
            }, 15500, this);
        }
    }
    dispatchGamePlayerList() {
        console.log("sending player list");

        const arr = this.players.map((e) => e.socket.user);
        console.log(this.players);

        this.Lobby.io.in(this.gId).emit('game player list', arr);
    }
}

module.exports = GameRoom;