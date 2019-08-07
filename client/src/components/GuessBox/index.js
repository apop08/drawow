
// import Timer from '../components/Game/components/GameInfo/Timer/Timer';
import React, { Component } from 'react';
import API from "../../utils/API";
import AlertModal from "../AlertModal";
// import './style.css';

class GuessBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: '',
            modal: false,
            answer: null,
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
            console.log(this.props.guesser)
            this.updateScore(this.props.guesser);
            this.setState({answer: true})
        } else { 
            console.log("wrong");
            this.setState({answer:false})
        }
        this.setState({guess: '', modal:true})
  
    }

    updateScore(user) {
        
        API.updateScore(user).then(({data}) => {
            
        });
        this.props.score.updateScore();
    }


    render() {
        let modal;
        if(this.state.modal){
            modal=  <AlertModal answer = {this.state.answer}/>;
            let obj =this;
            setTimeout(function(){obj.setState({modal:false, answer: null})}, 4000);
        }
        return (<div>{modal}
            <input type="guess" name= "guess" value={this.state.guess}
        onChange={this.handleChange}></input>	
        <button className="btn btn-secondary guess" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>)
   
    }
}
export default GuessBox;
