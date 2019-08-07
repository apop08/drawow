import React, { Component } from 'react';
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
        let rank = 1;
        return (
            <div>
            
            <h1>Rank</h1>
            <hr></hr>
            <br></br>
            <div id="content">
              {this.state.users.map(user=> <h2>{rank-- > 0 ? (<i class="fas fa-crown"></i>): null}{user.local.username}   :  {user.score}</h2> )}
            </div>

        </div>
     )}
}
export default Rank;