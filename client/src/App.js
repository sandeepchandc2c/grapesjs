
import React, { Suspense, lazy, Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,

} from "react-router-dom";

const UPLOAD = lazy(() => import("./view/upload"));
const Grapes = lazy(()=>import("./view/Grapes"))
const Sheets = lazy(()=>import("./view/Sheets"))
function App() {
  return (
    <div>
    

    <Suspense fallback={<h1>Loading...</h1>}>
    <Router>
      <Switch>
         <Route path="/" exact component={UPLOAD}></Route>
         <Route path="/grapes/:id" exact component={Grapes}></Route>
         <Route path="/sheets" exact component={Sheets}></Route>
      </Switch>
    </Router>
  </Suspense>
  </div>
  );
}

export default App;
