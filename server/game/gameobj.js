
const logic = require('./logic');

class GameObj{
    constructor(io){
        this.io = io;
        this.logic = new logic(io, this);
        this.logic.initSocketEvents();
        //players array
        this.players = [];
        //drawer is one player
        this.drawer = null;
        this.live = false;
    }
    init(){
        this.live = true;
        const idx = Math.floor(Math.random() * this.users.length);
        this.drawer = this.users[idx];
        //console.log(this.drawer + " iasdfjasdjflsdajkfkldsaj");
        
        return this.drawer
    }

}
module.exports = GameObj;