import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './Services/History';
import MainCalendar from './Calendar/Calendar';
import CharacterSheet from './CharacterSheet/CharacterSheet';
import CharacterContextProvider from './context/Character';

function App(): JSX.Element {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainCalendar}></Route>
        <CharacterContextProvider>
          <Route exact path="/sheet" component={CharacterSheet}></Route>
        </CharacterContextProvider>
        <Route component={() => (<p>Route does not exist</p>)} />
      </Switch>
    </Router>
  )
};

export default App;
