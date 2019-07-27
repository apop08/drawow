import React, { Component } from 'react';
import Nav from '../Nav';
import API from '../../utils/API';

class Rank extends Component{
    state ={
        users:[]
    }
   componentDidMount(){ 
       API.getUsers().then(({data} )=> {
        this.setState({users:data})   
        console.log(data)})
       .catch(err => console.log(err))
    //    make axios request
   }
    render(){
        return (
            <div>
            
            <h1>hello</h1>
            <div id="content">
              {this.state.users.map(user=> <h2>{user.local.username}</h2>)}
            </div>

        </div>
     )}
}
export default Rank;

