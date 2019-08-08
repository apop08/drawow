import React, { Component } from 'react';
import Modal, { ModalHeader, ModalBody } from '../components/Modal/index';
import About from '../components/About/index';
import Rank from '../components/Rank/index';
// import Container from '../components/Container/Container';
import Game from './Game'
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      button: "",
      score: this.props.score
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle = event => {
    const { name, value } = event.target;
    this.setState({ modal: !this.state.modal, [name]: value });
  }
  updateScore() {
    this.setState({score: this.state.score + 1});

  }
  render() {
    console.log(this.props.user);
    var test = "";
    console.log(this.state.button);
    switch (this.state.button) {
      case "about":
        test = <About />
        break
      case "game":
        test = <Game user={this.props.user} score={this}/>
        break
      case "rank":
        test = <Rank />
        break
      default:
    }

    return (
      <div className = "navPage">
        <h1 id = "userName"><span id = "welcome">Welcome,</span><br></br>{this.props.user}</h1>
        <h1 id = "userPoints2"><span id = "points">Points: </span>{this.state.score}</h1>
        <div className="App">
          <button
            name="button"
            type="button"
            value="about"
            className="btn btn-secondary navBtn"
            onClick={this.toggle}
          >
            About
        </button>
          <button
            name="button"
            type="button"
            value="game"
            className="btn btn-secondary navBtn"
            onClick={this.toggle}
          >
            Game
        </button>
          <button
            name="button"
            type="button"
            value="rank"
            className="btn btn-secondary navBtn"
            onClick={this.toggle}
          >
            Rank
        </button>
          <button
            className="btn btn-secondary navBtn"
            onClick={this.props._logout}
          >
            Logout
        </button>

          <Modal isOpen={this.state.modal} className="modal">
            <ModalHeader>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={this.toggle}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </ModalHeader>
            <ModalBody>
              {test}
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Nav;