import React, { Component } from 'react';
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
const socket = openSocket();
class Game extends Component {
    constructor(props) {
        super(props);

        this.sendSocketIO = this.sendSocketIO.bind(this);
    }

    componentDidMount() {

    }

    sendSocketIO() {
        socket.emit('example_message', 'demo');
    }

    submit(e) {

        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;

    }

    render() {
        { console.log(process.env.proxy) }
        return <div>
            <ul id="messages"></ul>
            <form action="">
                <input id="m" autocomplete="off" /><button onSubmit={this.submit.bind(this)}>Send</button>
            </form>
        </div>
    }
}
export default Game;