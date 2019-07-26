
// import Timer from '../components/Game/components/GameInfo/Timer/Timer';
import React, { Component } from 'react';
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
import moment from 'moment';
import Canvas from '../components/Canvas';
import $ from 'jquery';

import Timer from '../components/Game/components/GameInfo/Timer/Timer'

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
            formToPresent: null,
            timer: 0
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
        // const intervalId = setInterval(() => {
        //     const t = ++this.state.timer
        //     console.log(t)
        //     this.setState({ timer: t })
        //     if (t >= 5) {
        //         clearInterval(intervalId)
        //     }
        // }, 1000);

        const intervalId = setInterval(() =>{
            secondPlay()
        }, 1000);


        const intervalMinuteID = setInterval(() =>{
            minutePlay()
        }, 10000);

        setInterval(function () {
            clearInterval(intervalId);
            clearInterval(intervalMinuteID);
        }, 60000);

        function secondPlay() {
            $("body").removeClass("play");
            var aa = $("ul.secondPlay li.active");

            if (aa.html() == undefined) {
                aa = $("ul.secondPlay li").eq(0);
                aa.addClass("before")
                    .removeClass("active")
                    .next("li")
                    .addClass("active")
                    .closest("body")
                    .addClass("play");

            }
            else if (aa.is(":last-child")) {
                $("ul.secondPlay li").removeClass("before");
                aa.addClass("before").removeClass("active");
                aa = $("ul.secondPlay li").eq(0);
                aa.addClass("active")
                    .closest("body")
                    .addClass("play");
            }
            else {
                $("ul.secondPlay li").removeClass("before");
                aa.addClass("before")
                    .removeClass("active")
                    .next("li")
                    .addClass("active")
                    .closest("body")
                    .addClass("play");
            }

        }

        function minutePlay() {
            $("body").removeClass("play");
            var aa = $("ul.minutePlay li.active");

            if (aa.html() == undefined) {
                aa = $("ul.minutePlay li").eq(0);
                aa.addClass("before")
                    .removeClass("active")
                    .next("li")
                    .addClass("active")
                    .closest("body")
                    .addClass("play");

            }
            else if (aa.is(":last-child")) {
                $("ul.minutePlay li").removeClass("before");
                aa.addClass("before").removeClass("active");
                aa = $("ul.minutePlay li").eq(0);
                aa.addClass("active")
                    .closest("body")
                    .addClass("play");
            }
            else {
                $("ul.minutePlay li").removeClass("before");
                aa.addClass("before")
                    .removeClass("active")
                    .next("li")
                    .addClass("active")
                    .closest("body")
                    .addClass("play");
            }
        }
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
            return <ul id="oldMessage">{e}</ul>;
        })
        let chatPage;
        let chatBtn;
        if (this.state.formToPresent) {
            chatPage = <div className="chatPage">
                <ul style={{ color: 'Black' }} id="messages">{chat}</ul>
                <form action="">
                    <input className="chatBox" type="text" name="message" ref="m" value={this.state.message} onChange={this.handleChange} /><button className="btn btn-secondary send" onClick={this.submitChat.bind(this)}>Send</button>
                </form>
            </div>
            chatBtn = <button onClick={this.openChat} className="btn btn-secondary xButton">X</button>
        } else {
            chatBtn = <button onClick={this.openChat} className="btn btn-secondary chatButton">Chat </button>
        }

        let canv = <button onClick={this.startGame.bind(this)} className="btn btn-secondary startButton">Start</button>;
        let timer = null;
        if (this.state.live) {
            timer = <Timer time={this.state.timer}></Timer>;
            canv = <Canvas ref={this.canvasRef} gameobj={this} drawer={this.state.drawer} />
        }

        return <div>


            {timer}
            <div id="user">{this.state.users} </div>

            {canv}
            <div className="chat">
                {chatBtn}
                {chatPage}
            </div>
        </div>
    }



}
export default Game;
