
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

const AutoSign = lazy(()=>import("./view/automaticsign"))
const Esign = lazy(()=>import("./view/Esign"))
const Config = lazy(()=>import("./view/Config"))
function App() {
  return (
    <div>
    

    <Suspense fallback={<h1>Loading...</h1>}>
    <Router>
      <Navbar/>
      <Switch>
         <Route path="/" exact component={UPLOAD}></Route>
         <Route path="/grapes/:id" exact component={Grapes}></Route>
         <Route path="/sheets" exact component={Sheets}></Route>
         <Route path="/sign" exact component={Signature}></Route>
         
         <Route path="/autoSign" exact component={AutoSign}></Route>
         <Route path="/config/:id" exact component={Config}></Route>
         <Route path="/esign/:id/:user" exact component={Esign}></Route>
      </Switch>
    </Router>
  </Suspense>
  </div>
  );
}

export default App;
