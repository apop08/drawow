import React, { Component } from "react";

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state ={
            value: 1
        };
    }
    componentDidMount(){
        this.refs.input.value = this.state.value;
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        this.props.fn(event.target.value);
    }

    render() {
        return <div id ="slider">
            <input type="range" ref='input' style={this.props.style}  min={this.props.min} max={this.props.max} onChange={this.handleChange.bind(this)} step={this.props.step} />
        </div>;
    }
}
export default Slider;  