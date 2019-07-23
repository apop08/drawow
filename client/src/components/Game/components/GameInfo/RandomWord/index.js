
// import Timer from '../components/Game/components/GameInfo/Timer/Timer';
import React, { Component } from 'react';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
        };

    }
    
    getWord (){
        let list = ['apple', 'banana','kiwi'];
        return list[(Math.random()*list.length)]
    }
    componentDidMount() {
        this.setState({word : this.getWord()})
    }




    render() {
        return (  <h1>{this.state.word} </h1>)
   
    }
}
export default Word;
