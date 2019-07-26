import React, { Component } from "react";
import './Timer.css';

class Timer extends Component {
    constructor(props) {
        // displayTime(props);
        super(props)
        this.state = {
            time: 0
        };
    }

    render() {
        return <div>

            <div class="Timercontainer">
                <ul class="flip minutePlay">
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">0</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">0</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">1</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">1</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">2</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">2</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">3</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">3</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">4</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">4</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">5</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">5</div>
                        </div>
                    </li>
                </ul>
                <ul class="flip secondPlay">
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">0</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">0</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">1</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">1</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">2</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">2</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">3</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">3</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">4</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">4</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">5</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">5</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">6</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">6</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">7</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">7</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">8</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">8</div>
                        </div>
                    </li>
                    <li>
                        <div class="up">
                            <div class="shadow"></div>
                            <div class="inn">9</div>
                        </div>
                        <div class="down">
                            <div class="shadow"></div>
                            <div class="inn">9</div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    }
}
export default Timer;  