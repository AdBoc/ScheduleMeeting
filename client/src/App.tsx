import React from "react";
import {Route, Router, Switch} from "react-router-dom"
import {history} from "./utils/history";

import {Slide, ToastContainer} from "react-toastify";

import CalendarPage from "./components/CalendarPage/CalendarPage";
import CharacterSheet from "./components/CharacterSheet/CharacterSheet";
import NotFound404 from "./components/NotFound404";

import 'react-toastify/dist/ReactToastify.css'
import "./assets/normalize.css";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={CalendarPage}/>
        <Route exact path={"/sheet"} component={CharacterSheet}/>
        <Route component={NotFound404}/>
      </Switch>
      <ToastContainer transition={Slide} autoClose={1500} pauseOnHover={false} position="bottom-center" hideProgressBar newestOnTop/>
    </Router>
  )
}

export default App;