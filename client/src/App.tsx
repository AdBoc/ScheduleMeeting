import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './helpers/history';
import MainComponent from './components/MainComponent';

import './styles/App.css';
import './styles/CalendarApp.scss';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';

function App(): JSX.Element {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainComponent}></Route>
        <Route exact path="/witek" component={CharacterSheet}></Route>
        <Route component={() => <p>Route does not exist</p>} />
      </Switch>
    </Router>
  )
};

export default App;
