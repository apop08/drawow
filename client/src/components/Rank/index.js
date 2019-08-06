import React, { Component } from 'react';
import API from '../../utils/API';
import './style.css';

class Rank extends Component{
    state ={
        users:[],
        rankOne: ''
    }
   componentDidMount(){ 
       API.getUsers().then(({data} )=> {
        this.setState({users:data, rankOne: data[0].local.username})   
        console.log(data)})
       .catch(err => console.log(err))
    //    make axios request
   }
    render(){
        let crown;
        console.log(this.state.rankOne)
   
        return (
            <div>
            
            <h1>Rank</h1>
            <hr></hr>
            <br></br>
            <div id="content">
              {this.state.users.map(user=> 
              <tr>
                  <td> <h2>{user.local.username}</h2>  </td>
                  <td> <h2>{user.score}</h2></td>
            </tr>
              )}
            </div>

        </div>
     )}
}
export default Rank;