
// import Timer from '../components/Game/components/GameInfo/Timer/Timer';
import React, { Component } from 'react';
import './style.css';

class RandomWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
        };

    }
    
    getWord (){
        let list = ['apple', 'banana','kiwi'];
        // console.log(list[Math.floor(Math.random()*list.length)])
        return list[Math.floor(Math.random()*list.length)]
    }
    componentDidMount() {
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
