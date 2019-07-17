import React, { Component } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import Container from '../components/Container/Container';
import './LoginPage.css'
import 'react-awesome-button/dist/themes/theme-blue.css';
// import images from '../../public/images';
import Login from './Login'

class LoginPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {formToPresent: null};
        this.handleLoginPress = this.handleLoginPress.bind(this);
    }

    handleLoginPress()
    {

        console.log(this.state.formToPresent);
        
        this.setState({formToPresent: <Login _login={this.props._login}/>});
    }

    handleSignUpPress()
    {
        //this.formToPresent = <SignUp/>;
    }
    render() {
        return (
            <Container>
                <div className='about-page'>
                    <div className='container '>
                        
                        <AwesomeButton className='custom-button' type="primary" onPress={(e) => this.handleLoginPress(e)}>LogIn</AwesomeButton>

                        <AwesomeButton className='custom-button' type="primary">Sign Up</AwesomeButton>

                        {this.state.formToPresent}
                    </div>
                </div>
            </Container>
        );
    }
}

export default LoginPage;