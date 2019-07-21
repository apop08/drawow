import React, { Component } from 'react';
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
import moment from 'moment';
import Canvas from '../components/Canvas';
const socket = openSocket();
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {message: '',
                      chat: []};
        this.sendSocketIO = this.sendSocketIO.bind(this);
        this.handleChange = this.handleChange.bind(this);
        let obj = this;
        socket.on('chat message', function(msg){
            console.log(msg);
            obj.setState({ chat: [...obj.state.chat, msg] })
            console.log(obj.state.chat)
          });
    }

    componentDidMount(){

    }

    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
    sendSocketIO() {
        socket.emit('example_message', 'demo');
    }

    submitChat(e) {

        e.preventDefault(); // prevents page reloading
        //console.log(this.state.message);
        const msg = `[${moment().format('LTS')}] ${this.props.user}: ${this.state.message}`;
        socket.emit('chat message', msg);
        this.setState({message: ''});

        
        return false;

    }

    render() {
        let chat = this.state.chat.map(e => {
            return <li>{e}</li>;
        })
        return <div>
            <Canvas socket={socket} />
            <ul style={{color:'Black'}} id="messages">{chat}</ul>
            <form action="">
                <input  type="text" name="message" ref="m" value={this.state.message} onChange={this.handleChange}/><button onClick={this.submitChat.bind(this)}>Send</button>
            </form>
        </div>
    }
}
export default Game;