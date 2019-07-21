
const logic = require('./logic');

class GameObj{
    constructor(io){
        this.io = io;
        this.logic = new logic(io);
        this.logic.initSocketEvents();
        //players array
        this.players = [];
        //drawer is one player
        this.drawer = null;
    }
}
module.exports = GameObj;