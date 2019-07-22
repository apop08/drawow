import React, { Component } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import Container from '../components/Container/Container';
import './LoginPage.css'
import 'react-awesome-button/dist/themes/theme-blue.css';
// import images from '../../public/images';
import Login from './Login'
import Signup from './Signup'

class LoginPage extends Component {
    constructor(props) {
        super(props);
        // this.state = { formToPresent: <Login _login={this.props._login} />, width: 0 };
        this.state = { formToPresent: null , width: 0 };
        this.handleLoginPress = this.handleLoginPress.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }

    // attach login form when login button is clicked
    handleLoginPress() {
        this.setState({ formToPresent: <Login _login={this.props._login} loggedIn = {this.props.loggedIn}/> });
    }

    // attach signup form when signup button is clicked
    handleSignUpPress() {
        this.setState({ formToPresent: <Signup/> });
    }
    render() {
        return (
            <Container>
                <div className='about-page'>
                    <div className='our-container '>

                        <AwesomeButton style={{"--button-primary-color": "#5200ff", "--button-primary-color-dark": "#5200ff", "--button-primary-color-hover": "#5200ff","--button-primary-color-active":"#5200ff"}} className='custom-button' type="primary" onPress={(e) => this.handleLoginPress(e)}>LogIn</AwesomeButton>


                        <AwesomeButton style={{"--button-primary-color": "#ff5e86", "--button-primary-color-dark": "#ff5e86", "--button-primary-color-hover": "#ff5e86", "--button-primary-color-active":"#ff5e86"}} className='custom-button' type="primary" onPress={(e) => this.handleSignUpPress(e)}>Sign Up</AwesomeButton>

                        {this.state.width >= 712 && this.state.formToPresent }
                    </div>
                </div>
            </Container>
        );
    }
}

export default LoginPage;