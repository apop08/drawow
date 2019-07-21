import logic from './logic';
class GameObj{
    constructor(io){
        this.io = io;
        this.logic = new logic(io);

    }
}
export default GameObj;