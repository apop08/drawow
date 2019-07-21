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

    handleLoginPress() {

        console.log(this.state.formToPresent);
        // this.setState({formToPresent: null})
        this.setState({ formToPresent: <Login _login={this.props._login} loggedIn = {this.props.loggedIn}/> });
    }

    handleSignUpPress() {
        
        this.setState({ formToPresent: <Signup/> });
    }
    render() {
        return (
            <Container>
                <div className='about-page'>
                    <div className='our-container '>

                        <AwesomeButton className='custom-button' type="primary" onPress={(e) => this.handleLoginPress(e)}>LogIn</AwesomeButton>
                        { this.state.width < 682 && this.state.formToPresent}

                        <AwesomeButton className='custom-button' type="primary" onPress={(e) => this.handleSignUpPress(e)}>Sign Up</AwesomeButton>

                        {this.state.width >= 682 && this.state.formToPresent }
                    </div>
                </div>
            </Container>
        );
    }
}

export default LoginPage;