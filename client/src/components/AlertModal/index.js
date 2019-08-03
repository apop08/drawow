// import Modal from 'react-bootstrap/Modal'
import React, { Component } from 'react';
import './style.css';
import $ from 'jquery';

class AlertModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: '',
            display: 'none'
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
            this.setState({
                modalShow: 'show',
                display: 'block'
            });
            let obj = this;
            setTimeout(function(){obj.closeModal()},2000);
        }

        closeModal() {
            this.setState({
                modalShow: '',
                display: 'none'
            });
        }
        componentDidMount() {
            this.openModal();
        }

        render(){
            let answer;
            if (this.props.answer){
                answer = "CORRECT!"
            } else {
                answer = "WRONG!"
            }
            return (
                <div
                    className={'modal fade ' + this.state.modalShow}
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                    style={{ display: this.state.display }}
                >
                    <div className="modal-dialog modal-lg w3-animate-zoom" role="document">
                        <div className="alertmodal">{answer}</div>
                    </div>
                </div>
            );
        }
    }
        export default AlertModal;