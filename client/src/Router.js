
import React, {Suspense, lazy} from "react"

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "./style.scss"
const UploadComponent = lazy(() => import("./view/upload"));

const  GEditorExample  = lazy(() => import("./view/Grapes"));
const AllRouter = () => {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
        <Router>
        <Switch>
            <Route path={"/"} exact Component={UploadComponent}></Route>
        </Switch>
    </Router>
    </Suspense>
)

}

export default AllRouter;
 