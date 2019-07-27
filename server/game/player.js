const moment = require('moment')
class Player {
    constructor(socket, playerId, Lobby) {
        this.playerId = playerId;
        this.socket = socket;
        this.state = 'lobby';
        this.gameId = 0;
        this.isDrawing = false;
        this.gameObj = null;
        this.setEvents();
        this.Lobby = Lobby;
        //console.log(Lobby)
        this.Lobby.dispatchRooms(this.socket);
        this.Lobby.dispatchPlayers(this.socket);
    }
    joinRoom(gameObj) {
        this.state = 'waiting';
        this.gameId = gameObj.gId;
        this.gameObj = gameObj;
        this.socket.emit('joined game', gameObj.gId)
        this.socket.join(this.gameId);
    }
    leaveRoom() {
        this.state = lobby;
        this.socket.leave(this.gameId);
        this.gameId = 0;
        this.gameObj = null
    }
    sendTo(type, obj) {
        this.socket.emit(type, obj);
    }
    startGame() {
        this.state = 'playing';
    }
    setDrawer() {
        this.isDrawing = true;
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
            obj.Lobby.dispatchPlayers();
        });

        this.socket.on('chat message', function (msg) {
            const chatmsg = `[${moment().format('LTS')}] ${obj.socket.user}: ${msg}`;
            obj.gameObj.dispatchChat(chatmsg);
        })

        this.socket.on('disconnect', function () {
            console.log(`${obj.socket.user} disconnected`);
            if(obj.gameObj)
                obj.gameObj.removePlayer(obj);
        });

        this.socket.on('start', function () {
            obj.gameObj.dispatchStart();
        });

        this.socket.on('join room', function(id){
            obj.Lobby.playerJoinRoom(obj, id);
        });

        this.socket.on('start room', function(){
            console.log("start room");
            
            const game = obj.Lobby.newGame();

            obj.Lobby.playerJoinRoom(obj, game.gId);
        });
    }
}
module.exports = Player;