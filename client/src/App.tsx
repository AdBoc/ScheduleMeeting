import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './helpers/history';
import MainComponent from './components/MainComponent';
import CharacterSheet from './components/CharacterSheet';
import CharacterContextProvider from './context/character';

import './styles/App.css';

function App(): JSX.Element {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainComponent}></Route>
        <CharacterContextProvider>
          <Route exact path="/sheet" component={CharacterSheet}></Route>
        </CharacterContextProvider>
        <Route component={() => (<p>Route does not exist</p>)} />
      </Switch>
    </Router>
  )
};

export default App;
