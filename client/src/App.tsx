import React, {Suspense} from "react";
import {Route, Router, Switch} from "react-router-dom"

import {Slide, ToastContainer} from "react-toastify";
import {customHistory} from "./utils/history";

import CalendarPage from "./pages/CalendarPage/CalendarPage";
import NotFound404 from "./pages/NotFound404/NotFound404";

import 'react-toastify/dist/ReactToastify.css';
import './assets/fonts.css';
import "./assets/normalize.css";

const CharacterSheet = React.lazy(() => import('./pages/CharacterSheet/CharacterSheet'));

function App() {
  return (
    <Router history={customHistory}>
      <Suspense fallback={<div className="loading-screen">Loading Page...</div>}>
        <Switch>
          <Route exact path="/" component={CalendarPage}/>
          <Route exact path={"/sheet"} component={CharacterSheet}/>
          <Route component={NotFound404}/>
        </Switch>
      </Suspense>
      <ToastContainer transition={Slide} autoClose={1500} pauseOnHover={false} position="bottom-center" hideProgressBar newestOnTop/>
    </Router>
  )
}

export default App;