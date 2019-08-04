import React, { Component } from "react";
import './Timer.css';

class Timer extends Component {
    constructor(props) {
        // displayTime(props);
        super(props)
        this.state = {
            time: 360 / this.props.timeMax,
            counter: 360
        };
    }
    componentDidMount() {
        //let time = 360 / this.state.time; /// this.props.obj.state.timerMax;
        var loader = document.getElementById('loader')
            , border = document.getElementById('border')
            , pi = Math.PI;

        (function draw(obj) {
            //console.log(obj)
            if(obj.state.counter < 360) obj.setState({counter: obj.state.counter + 1});


            let b = 360 - obj.state.counter;
            
            var r = (b * pi / 180)
                , x = Math.sin(r) * 25
                , y = Math.cos(r) * - 25
                , mid = (b > 180) ? 1 : 0
                , anim = 'M 0 0 v -25 A 25 25 1 '

                    + mid + ' 1 '
                    + x + ' '
                    + y + ' z';
            //[x,y].forEach(function( d ){
            //  d = Math.round( d * 1e3 ) / 1e3;
            //});

            loader.setAttribute('d', anim);
            border.setAttribute('d', anim);

            setTimeout(draw, 1000 / obj.state.time, obj); // Redraw
        })(this);

    }

    setTime(time){
        this.setState({
            time: 360 / time,
            counter: 0
        })
    }
    render() {
        return <svg width="60" height="60" viewbox="0 0 150 150">
            <path id="border" transform="translate(25, 25)" />
            <path id="loader" transform="translate(25, 25) scale(.84)" />
        </svg>
    }
}
export default Timer;  