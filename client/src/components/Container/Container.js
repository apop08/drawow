import React, { Component } from 'react';
import Nav from '../Nav';
import Footer from '../Footer/Footer';

class Storage extends Component {
    render() {

        return <div className='page-container'>
            <Nav></Nav>
            <div className='page-content'>{ this.props.children }</div>
            <Footer></Footer>
        </div>
    }
}

export default Storage;