import React, { Component } from 'react';
import Modal, { ModalHeader, ModalBody } from '../components/Modal/index';
import About from '../components/About/index';
import Rank from '../components/Rank/index';
import Profile from '../components/Profile/index';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      button: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle = event => {
    const { name, value } = event.target;
    this.setState({ modal: !this.state.modal, [name]: value });
  }

  render() {
    console.log(this.props.user);
    var test = "";
    console.log(this.state.button);
    switch (this.state.button) {
      case "about":
        test = <About/>
        break
      case "game":
        test = "this is game"
        break
      case "rank":
        test = <Rank/>
        break
      case "profile":
        test = <Profile/>
        break
      default:
    }
 
    return (<div>

    <h1>{this.props.user}</h1>
    <button onClick={this.props._logout}>logout</button>
      <div className="App d-flex justify-content-center">
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
          name="button"
          type="button"
          value="profile"
          className="btn btn-secondary navBtn"
          onClick={this.toggle}
        >
          Profile
        </button>
        <Modal isOpen={this.state.modal}>
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
            <p>{test}</p>
          </ModalBody>
        </Modal>
      </div>
      </div>
    );
  }
}

export default Nav;