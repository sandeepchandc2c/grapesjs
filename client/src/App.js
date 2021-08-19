
import React, { Suspense, lazy } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,

} from "react-router-dom";
import Navbar from "./component/navbar"
const UPLOAD = lazy(() => import("./view/upload"));
const Grapes = lazy(()=>import("./view/Grapes"))
const Sheets = lazy(()=>import("./view/Sheets"))
const Signature = lazy(()=>import("./view/Signature"))
function App() {
  return (
    <div>
    

    <Suspense fallback={<h1>Loading...</h1>}>
    <Router>
      <Navbar/>
      <Switch>
         <Route path="/" exact component={UPLOAD}></Route>
         <Route path="/grapes/:id" exact component={Grapes}></Route>
         {/* <Route path="/sheets" exact component={Sheets}></Route> */}
         <Route path="/sign" exact component={Signature}></Route>
      </Switch>
    </Router>
  </Suspense>
  </div>
  );
}

export default App;
