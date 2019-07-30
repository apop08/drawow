
// import Timer from '../components/Game/components/GameInfo/Timer/Timer';
import React, { Component } from 'react';
// import './style.css';

class GuessBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: '',
        };
        this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

    }
    
    
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
    handleSubmit(event) {
        event.preventDefault();
        let answer = this.props.answer;
        console.log("submitted" + this.state.guess)
        console.log(answer);
        if (this.state.guess == answer){
            console.log("correct!")
        } else { 
            console.log("wrong");
        }
    }


    render() {
        return (<div><input type="guess" name= "guess" value={this.state.guess}
        onChange={this.handleChange}></input>	
        <button className="btn btn-secondary guess" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>)
   
    }
}
export default GuessBox;
