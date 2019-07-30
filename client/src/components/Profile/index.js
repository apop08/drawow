import React, { Component } from 'react';
import Nav from '../Nav';
import API from '../../utils/API';

class Rank extends Component{
    
    state ={
        user: " "
    }
   componentDidMount(){ 
       API.getUser().then((data)=> {
        this.setState({user:data})   
        console.log(data)})
       .catch(err => console.log(err))
    //    make axios request
   }
    render(){
        return (
            <div>
            
            <h1>Profile</h1>
            <hr></hr>
            <br></br>
            <div id="content">
        
              {}
            </div>

        </div>
     )}
}
export default Rank;

