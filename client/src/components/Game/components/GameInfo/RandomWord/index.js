
// import Timer from '../components/Game/components/GameInfo/Timer/Timer';
import React, { Component } from 'react';
import Words from "./wordBank.json"
import './style.css';

class RandomWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            words: Words,
        };

    }
    
    getWord (){
        let list = this.state.words.words.split(" ");
        console.log(list)
        // console.log(list[Math.floor(Math.random()*list.length)])
        return list[Math.floor(Math.random()*list.length)]
    }
    componentDidMount() {
        // this.getWord();
        // this.state.words = this.state.words.split(",");
        // console.log(this.state.words);
        // console.log(this.getWord());
        // let word = this.getWord();
        this.setState({word : this.getWord()})
    }




    render() {
        console.log(this.state.word);
        return (<div id = "randomWord">{this.state.word}</div>)
   
    }
}
export default RandomWord;
