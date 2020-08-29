import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './Services/History';
import Calendar from './Calendar/Calendar';
import CharacterSheet from './CharacterSheet/CharacterSheet';
import CharacterContextProvider from './context/Character';
import Reset from './components/Reset';

function App(): JSX.Element {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Calendar}></Route>
        <Route exact path="/reset" component={Reset}></Route>
        <CharacterContextProvider>
          <Route exact path="/sheet" component={CharacterSheet}></Route>
        </CharacterContextProvider>
      </Switch>
    </Router >
  )
};

export default App;
