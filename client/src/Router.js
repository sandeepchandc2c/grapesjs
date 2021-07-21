import React, { Suspense, lazy, Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import KBC from "./kbc"


class Routing extends Component {
    render() {
      return (
          <Router>
              <Switch>
                  <Route path={"/"} exact Component={KBC}></Route>
              </Switch>
          </Router>
      )
    
    
    
    }}

export default Routing;
 
 