import React, { Component } from "react";
import axios from 'axios';
import { ESRCH } from "constants";
class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
        string: 'default'
    };
  }

  componentDidMount() {
      let obj = this;
    axios.get('/test')
        .then(res => {

            obj.setState({string: res.data})
        })
    
  };

  render() {
    // let obj = this;
    return (<div><p>{this.state.string}</p></div>)
  }
}


export default Canvas;
