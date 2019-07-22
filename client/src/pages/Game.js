import React, { Component } from 'react';
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
import moment from 'moment';
import Canvas from '../components/Canvas';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            chat: []
        };
        this.sendSocketIO = this.sendSocketIO.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.canvasRef = React.createRef();

    }

    componentDidMount() {
        this.socket = openSocket();
        let obj = this;
        this.socket.on('chat message', function (msg) {
            console.log(msg);
            obj.setState({ chat: [...obj.state.chat, msg] })
            console.log(obj.state.chat)
        });
        this.socket.on('tradeUsername', function () {
            console.log("sending username");
            obj.socket.emit('tradeUsername', obj.props.user)
        });

        this.socket.on('drawing', function (img) {

            this.canvasRef.current.recPic(img);
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    sendSocketIO() {
        this.socket.emit('example_message', 'demo');
    }

    submitChat(e) {

        e.preventDefault(); // prevents page reloading
        //console.log(this.state.message);
        const msg = `[${moment().format('LTS')}] ${this.props.user}: ${this.state.message}`;
        this.socket.emit('chat message', msg);
        this.setState({ message: '' });


        return false;

    }

    sendImage(canvas) {
        const imgData = canvas.toDataURL('image/png', .3);
        //console.log(imgData)
        this.props.socket.emit('drawing', imgData);
    }


    render() {
        let chat = this.state.chat.map(e => {
            return <li>{e}</li>;
        })
        return <div>
            <Canvas ref={this.canvasRef} sendImage={this.sendImage} />
            <ul style={{ color: 'Black' }} id="messages">{chat}</ul>
            <form action="">
                <input type="text" name="message" ref="m" value={this.state.message} onChange={this.handleChange} /><button onClick={this.submitChat.bind(this)}>Send</button>
            </form>
        </div>
    }
}
export default Game;