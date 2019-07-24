import React, { Component } from 'react';
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
import moment from 'moment';
import Canvas from '../components/Canvas';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 'lobby',
            message: '',
            chat: [],
            drawer: false,
            live: false,
            users: [],
            globalUsers: [],
            rooms: []
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
        this.socket.on('Username', function () {
            console.log("sending username");
            obj.socket.emit('Username', obj.props.user)
        });

        this.socket.on('drawing', function (img) {

            obj.canvasRef.current.recPic(img);
        });
        this.socket.on('start game', function (drawer) {

            if (obj.props.user == drawer) {
                obj.setState({ drawer: true })
            }
            obj.setState({ live: true })
        });
        this.socket.on('game player list', function(users){
            obj.setState({users: users});
        })
        this.socket.on('global player list', function(users){
            obj.setState({globalUsers: users});
        })
        this.socket.on('room list', function(rooms){
            obj.setState({rooms: rooms});
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitChat(e) {

        e.preventDefault(); // prevents page reloading
        //console.log(this.state.message);
        const msg = `${this.state.message}`;
        this.socket.emit('chat message', msg);
        this.setState({ message: '' });


        return false;

    }

    startGame() {
        this.socket.emit('start');
    }
    sendImage(canvas) {
        const imgData = canvas.toDataURL('image/png', .3);
        //console.log(imgData)
        this.socket.emit('drawing', imgData);
    }


    render() {
        let chat = this.state.chat.map(e => {
            return <li>{e}</li>;
        })
        let canv = <button onClick={this.startGame.bind(this)}>Start</button>;
        if (this.state.live) {
            canv = <Canvas ref={this.canvasRef} gameobj={this} drawer={this.state.drawer} />
        }
        return <div>
            <p>{this.state.users}</p>
            {canv}
            <ul style={{ color: 'Black' }} id="messages">{chat}</ul>
            <form action="">
                <input type="text" name="message" ref="m" value={this.state.message} onChange={this.handleChange} /><button onClick={this.submitChat.bind(this)}>Send</button>
            </form>
        </div>
    }
}
export default Game;