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

            <div className="Timercontainer">
                <ul className="flip minutePlay">
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">0</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">0</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">1</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">1</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">2</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">2</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">3</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">3</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">4</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">4</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">5</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">5</div>
                        </div>
                    </li>
                </ul>
                <ul classNameName="flip secondPlay">
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">0</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">0</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">1</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">1</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">2</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">2</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">3</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">3</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">4</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">4</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">5</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">5</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">6</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">6</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">7</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">7</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">8</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">8</div>
                        </div>
                    </li>
                    <li>
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">9</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">9</div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    }
}
export default Timer;  