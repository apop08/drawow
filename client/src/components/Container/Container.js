import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

class Container extends Component {
    render() {

        return <div className='page-container'>
            <Nav></Nav>
            <div className='page-content'>{ this.props.children }</div>
            <Footer></Footer>
        </div>
    }
}

export default Container;