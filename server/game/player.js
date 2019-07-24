const moment = require('moment')
const Lobby = require('./lobby')
class Player {
    constructor(socket, playerId, gameObj) {
        this.playerId = playerId;
        this.socket = socket;
        this.state = 'lobby';
        this.gameId = 0;
        this.isDrawing = false;
        this.gameObj = gameObj;
        this.setEvents();
        Lobby.dispatchRooms(this.socket);
        Lobby.dispatchPlayers(this.socket);
    }
    joinRoom(game) {
        this.state = 'waiting';
        this.gameId = game.id;
        this.socket.join(this.gameId);
    }
    leaveRoom() {
        this.state = lobby;
        this.socket.leave(this.gameId);
        this.gameId = 0;
    }
    sendTo(type, obj) {
        this.socket.emit(type, obj);
    }
    startGame() {
        e.state = 'playing';
    }
    setDrawer() {
        this.isDrawing = true;
        this.socket.emit('Drawing');
    }
    askName() {
        this.socket.emit('Username');
    }
    setEvents() {
        const obj = this;
        this.socket.on('drawing', function (img) {
            //send the msg out
            obj.gameObj.dispatchDrawing(img);
        });

        this.socket.on('Username', function (user) {
            //send the msg out
            obj.socket.user = user;
            console.log(`Welcome ${obj.socket.user}`);
            Lobby.dispatchPlayers();
        });

        this.socket.on('chat message', function (msg) {
            const chatmsg = `[${moment().format('LTS')}] ${obj.socker.user}: ${msg}`;
            obj.gameObj.dispatchChat(chatmsg);
        })

        this.socket.on('disconnect', function () {
            console.log(`${obj.socket.user} disconnected`);
            obj.gameObj.removePlayer(obj);
        });

        this.socket.on('start', function () {
            obj.gameObj.dispatchStart();
        });

        this.socket.on('join room', function(id){
            Lobby.playerJoinRoom(obj, id);
        });

        this.socket.on('start room', function(){
            const game = Lobby.newGame();
            Lobby.playerJoinRoom(obj, game.gId);
        });
    }
}
module.exports = Player;