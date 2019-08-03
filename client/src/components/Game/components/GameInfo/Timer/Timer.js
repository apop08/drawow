import React, { Component } from "react";
import './Timer.css';

class Timer extends Component {
    constructor(props) {
        // displayTime(props);
        super(props)
        this.state = {
            time: this.props.timer
        };
    }
    componentDidMount() {
        var loader = document.getElementById('loader')
            , border = document.getElementById('border')
            , α = 0
            , π = Math.PI
            , t = 30;

        (function draw() {
            α++;
            α %= 360;
            var r = (α * π / 180)
                , x = Math.sin(r) * 125
                , y = Math.cos(r) * - 125
                , mid = (α > 180) ? 1 : 0
                , anim = 'M 0 0 v -125 A 125 125 1 '
                    + mid + ' 1 '
                    + x + ' '
                    + y + ' z';
            //[x,y].forEach(function( d ){
            //  d = Math.round( d * 1e3 ) / 1e3;
            //});

            loader.setAttribute('d', anim);
            border.setAttribute('d', anim);

            setTimeout(draw, t); // Redraw
        })();

    }

    render() {
        return <svg width="250" height="250" viewbox="0 0 250 250">
            <path id="border" transform="translate(125, 125)" />
            <path id="loader" transform="translate(125, 125) scale(.84)" />
        </svg>
    }
}
export default Timer;  