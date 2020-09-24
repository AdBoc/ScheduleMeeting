import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {history} from './Services/History';
import Calendar from './Calendar/Calendar';
import CharacterSheet from './CharacterSheet/CharacterSheet';
import CharacterContextProvider from './context/Character';
import Reset from './components/Reset';

function App(): JSX.Element {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Calendar}/>
        <Route exact path="/reset" component={Reset}/>
        <CharacterContextProvider>
          <Route exact path="/sheet" component={CharacterSheet}/>
        </CharacterContextProvider>
      </Switch>
    </Router>
  )
}

export default App;
