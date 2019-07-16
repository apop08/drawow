import React, { Component } from 'react';
import Modal, { ModalHeader, ModalBody } from '../components/Modal/index';
import './style.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div className="App d-flex justify-content-center">
        <button
          type="button"
          value="about"
          className="btn btn-secondary"
          onClick={this.toggle}
        >
          About
        </button>
        <button
          type="button"
          value="game"
          className="btn btn-secondary"
          onClick={this.toggle}
        >
          Game
        </button>    
         <button
          type="button"
          value="rank"
          className="btn btn-secondary"
          onClick={this.toggle}
        >
          Rank
        </button>     
        <button
          type="button"
          valut="profile"
          className="btn btn-secondary"
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
            <p>This is modal body</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Nav;