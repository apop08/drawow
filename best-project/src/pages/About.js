import React, { Component } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import Nav from '../components/Nav/Nav'
import './About.css';
import 'react-awesome-button/dist/themes/theme-blue.css';
import Footer from '../components/Footer/Footer';
// import images from '../../public/images';

class About extends Component {
    render() {
        return (
            <div>
                <Nav></Nav>
                <div className='about-page'>
                    <div className='container'>
                        <AwesomeButton className='custom-button' type="primary">Sign Up</AwesomeButton>
                        <AwesomeButton className='custom-button' type="primary">Login</AwesomeButton>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default About;