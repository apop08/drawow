
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
            state: 'lobby',
            message: '',
            chat: [],
            drawer: false,
            live: false,
            users: [],
            globalUsers: [],
            rooms: [],
            formToPresent: null,
            timer: 0,
            word: '',
            playerDrawing: '',

        };
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
        this.socket.on('Username', function () {
            console.log("sending username");
            obj.socket.emit('Username', obj.props.user)
        });

        this.socket.on('drawing', function (img) {

            obj.canvasRef.current.recPic(img);
        });
        this.socket.on('start game', function (info) {
            console.log(`the word is ${info.word}`)
            if (obj.props.user == info.drawer) {
                obj.setState({ drawer: true })
            }
            obj.setState({ live: true , word: info.word, playerDrawing: info.drawer})
        });

        this.socket.on('game player list', function (users) {
            obj.setState({ users: users });

        })

        this.socket.on('joined game', function (id) {
            obj.setState({ gId: id, state: 'waiting' });

        })
        this.socket.on('global player list', function (users) {
            obj.setState({ globalUsers: users });
        })
        this.socket.on('roomlist', function (rooms) {
            obj.setState({ rooms: rooms });
            console.log(obj.state.rooms);
        })

        //this.setState({ state: 'lobby' })
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
        // const intervalId = setInterval(() => {
        //     const t = ++this.state.timer
        //     console.log(t)
        //     this.setState({ timer: t })
        //     if (t >= 5) {
        //         clearInterval(intervalId)
        //     }
        // }, 1000);

        const intervalId = setInterval(() => {
            secondPlay()
        }, 1000);


        const intervalMinuteID = setInterval(() => {
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
    joinRoom(id, e) {
        e.preventDefault();
        this.socket.emit('join room', id);
    }

    createRoom(e) {
        e.preventDefault();
        this.socket.emit('start room');
    }

    render() {
        if (this.state.state == 'lobby') {
            return <div>
                {this.state.rooms.map((e) => {
                    if(e.state == 'waiting')
                        return <button onClick={this.joinRoom.bind(this, e.gId)} key={e.gId}>{e.gId}<br/>{e.state}</button>
                    else
                        return <button onClick={this.joinRoom.bind(this, e.gId)} key={e.gId} disabled>{e.gId}<br/>{e.state}</button>
                })}
                <button onClick={this.createRoom.bind(this)}>Create Room</button>
            </div>

        }
        else {

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
                canv = <Canvas ref={this.canvasRef} word={this.state.word} gameobj={this} drawer={this.state.drawer} />
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



}
export default Game;
