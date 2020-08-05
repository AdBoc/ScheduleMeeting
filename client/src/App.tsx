import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './helpers/history';
import MainComponent from './components/MainComponent';

import './styles/App.css';
import './styles/CalendarApp.scss';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import CharacterContextProvider from './context/character';

function App(): JSX.Element {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainComponent}></Route>
        <CharacterContextProvider>
          <Route exact path="/witek" component={CharacterSheet}></Route>
        </CharacterContextProvider>
        <Route component={() => (<p>Route does not exist</p>)} />
      </Switch>
    </Router>
  )
};

export default App;
