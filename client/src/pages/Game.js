import React, { Component } from 'react';
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
import moment from 'moment';
import Canvas from '../components/Canvas';
import './Game.css'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            chat: [],
            drawer: false,
            live: false,
            users: [],
            formToPresent: null
        };
        this.sendSocketIO = this.sendSocketIO.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.canvasRef = React.createRef();
        this.openChat = this.openChat.bind(this);

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

            obj.canvasRef.current.recPic(img);
        });
        this.socket.on('startGame', function (drawer) {

            if (obj.props.user == drawer) {
                obj.setState({ drawer: true })
            }
            obj.setState({ live: true })
        });
        this.socket.on('userList', function (users) {
            obj.setState({ users: users });
        })
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

    startGame() {
        this.socket.emit('start');
    }
    sendImage(canvas) {
        const imgData = canvas.toDataURL('image/png', .3);
        //console.log(imgData)
        this.socket.emit('drawing', imgData);
    }
    openChat(e) {
        e.preventDefault();
        if (this.state.formToPresent === true) {
            this.setState({ formToPresent: false })
        } else {
            this.setState({ formToPresent: true });
        }
    }


    render() {
        let chat = this.state.chat.map(e => {
            return <ul id ="oldMessage">{e}</ul>;
        })
        let chatPage;
        let chatBtn;
        if (this.state.formToPresent) {
            chatPage = <div className ="chatPage">
                <ul style={{ color: 'Black'}} id="messages">{chat}</ul>
                <form action="">
                    <input className = "chatBox" type="text" name="message" ref="m" value={this.state.message} onChange={this.handleChange} /><button  className="btn btn-secondary send" onClick={this.submitChat.bind(this)}>Send</button>
                </form>
            </div>
            chatBtn= <button onClick={this.openChat} className ="btn btn-secondary xButton">X</button>
        }else {
            chatBtn =<button onClick={this.openChat} className ="btn btn-secondary chatButton">Chat </button>
        }

        let canv = <button onClick={this.startGame.bind(this)} className ="btn btn-secondary startButton">Start</button>;
        if (this.state.live) {
            canv = <Canvas ref={this.canvasRef} gameobj={this} drawer={this.state.drawer} />
        }

        return <div>
            <p>{this.state.users} </p>
            {canv}
            <div className="chat">
                {chatBtn}
                {chatPage}
            </div>
        </div>
    }
}
export default Game;