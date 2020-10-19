import React from 'react';
import {store} from '../../redux/store';
import {Provider} from 'react-redux';

import {useSwipe} from "../../hooks/useSwipe";

import {AllActions, Background, Equipment, Header, QuickAccess, SavingThrows, Skills, Stats} from './index';

const CURRENT_TAB: { [key: string]: JSX.Element } = {
  allActions: <AllActions/>,
  background: <Background/>,
  equipment: <Equipment/>,
  savingThrows: <SavingThrows/>,
  skills: <Skills/>,
  stats: <Stats/>,
  quickAccess: <QuickAccess/>
};

const CharacterSheet = () => {
  const {currentTab, handleTouchEnd, handleTouchStart} = useSwipe();

  return (
    <Provider store={store}>
      <Header/>
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>{CURRENT_TAB[currentTab]}</div>
    </Provider>
  );
}

export default CharacterSheet;