
const logic = require('./logic');
class GameObj{
    constructor(io){
        this.io = io;
        this.logic = new logic(io);

    }
}
module.exports = GameObj;