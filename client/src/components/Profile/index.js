
// import React, { Component } from 'react';
// import Nav from '../Nav';
// import './profile.css';
// import React from 'react';

import React, { Component } from 'react';
import './Profile.css'

class Profile extends Component {

    render() {

        return (
            <div>
                <div id="backgroundProfileBottom">
                    <h3>PROFILE</h3>
                    <div>
                        <h1 id="messageLabel">Evgenia</h1>
                    </div>
                    <div>
                        <h2 id="points">Points: 15</h2>
                    </div>
                </div>
            </div>
        );
    }
}

// function Profile() {
//     return (
//         <div>
//             <Nav />

//             <div id="content">

//             </div>

//         </div>
//     )

//     function Profile() {
//         return (
//             <p>"test profile"</p>
//         )
//     }
// }

export default Profile;
