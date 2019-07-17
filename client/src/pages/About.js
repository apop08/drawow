import React, { Component } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import Container from '../components/Container/Container';
import './About.css';
import 'react-awesome-button/dist/themes/theme-blue.css';
// import images from '../../public/images';

class About extends Component {
    render() {
        return (
            <Container>
                <div className='about-page'>
                    <div className='container'>
                        <a href='/'>
                            <AwesomeButton className='custom-button' type="primary">LogIn</AwesomeButton>
                        </a>
                        <a href='/'>
                        <AwesomeButton className='custom-button' type="primary">Sign Up</AwesomeButton>
                        </a>
                    </div>
                </div>
            </Container>
        );
    }
}

export default About;