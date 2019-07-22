import React, { Component } from "react";
import Game from '../../../../../pages/Game';

class Timer extends Component {
    constructor(props) {
        displayTime(props);
        this.state = {
            time: 30
        };
        let obj = this
        setInterval(() => {obj.setState({time: --obj.state.time})}, 1000);

        $('#clockID').html(time);


    }
    render() {
        return <div >
            <p>{this.state.time}</p>
        </div>;
    }
}
export default Timer;  