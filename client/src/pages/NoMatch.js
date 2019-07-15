import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer"

// NoMatch page when page wasn't found
function NoMatch() {
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <h1>
                <span role="img" aria-label="Face With Rolling Eyes Emoji">
                    🙄
              </span>
            </h1>
        </div>
    );
}

export default NoMatch;
