import React, { Component } from "react";

class Timer extends Component {
    constructor(props) {
        // displayTime(props);
        super(props)
        this.state = {
            time: 0
        };
    }

    componentDidMount() {
        let obj = this;

        const intervalId = setInterval(() => {
            const t = ++obj.state.time
            console.log(t)
            obj.setState({time: t})
            if (t >= 5) {
                clearInterval(intervalId)
            }
        }, 1000);
    }

    render() {
        return <div style={{border: '2px solid red', margin: '10px'}}>
            <p>{this.state.time}</p>
        </div>;
    }
}
export default Timer;  