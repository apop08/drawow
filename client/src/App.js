
import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from "./pages/Login";
// import About from "./pages/About";
// import Game from "./pages/Game";
// import Rank from "./pages/Rank";
// import Profile from "./pages/Profile";
// import NoMatch from "./pages/NoMatch";
// import Canvas from "./components/Canvas"
import Nav from "./pages/Nav";

// Set up the router
function App() {
  return (
    // <Router>
      <div>
        <Nav /> 
        {/* <Switch>
          <Route path ="/" exact component={Login}></Route>
          <Route path ="/about" exact component={About}></Route>
          <Route path ="/game" exact component={Game}></Route>
          <Route path ="/rank" exact component={Rank}></Route>
          <Route path ="/profile" exact component={Profile}></Route>
          <Route path ="/test/canvas" exact component={Canvas}></Route>
          <Route component ={NoMatch}></Route>
        </Switch> */}

      </div>
    // </Router>
  );
}

export default App;

