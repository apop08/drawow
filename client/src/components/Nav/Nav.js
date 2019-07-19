import React, { Component } from 'react';
import logo from '../../images/DrawWow_PNG-02.png'
import './Nav.css';

class Nav extends Component {
    render() {
        return <div className='nav'>
            <div><img src={logo} className='logo' alt='logo'></img></div>
        </div>
    }
}

export default Nav;