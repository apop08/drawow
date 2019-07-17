import React from 'react';
import './style.css'
function About() {
    return (
        <div>
            <h1> DraWow</h1><hr></hr>
            <div id="content">
                <p><span id = "quotes">“<span id ="tall">S</span>tudies show that art therapy, coloring mandalas, and drawing in general can minimize 
                    anxiety and combat negative mood. Most of the studies have people drawing or coloring 
                    for about 20 minutes, so it’s really not necessary to be a gifted or serious artist for 
                    this stress reliever to be helpful; no artistic ability is required, in fact!”</span></p>
                    <div className ="githubLink">
                <a href="https://github.com/apop08">Alex</a> <a href ="https://github.com/evgeniasemez">Evgenia</a>
                 <a href ="https://github.com/lucy839">Lucy</a> <a href= "https://github.com/nursaids">Said</a>
                 </div>
            </div>

        </div>
    )
}
export default About;