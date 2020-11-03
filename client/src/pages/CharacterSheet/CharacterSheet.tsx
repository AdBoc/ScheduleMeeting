import React from "react";
import {useSwipe} from "../../hooks/useSwipe";

import {AllActions, Background, Equipment, Header, QuickAccess, SavingThrows, Skills, Stats} from './index';
import ContextMenu from "./ContextMenu";
import SelectMenu from "./SelectMenu";

import styles from './characterSheet.module.scss';

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
  const {currentTab, tabs, setCurrentIndex, handleTouchEnd, handleTouchStart} = useSwipe();
  return (
    <div className={styles.characterSheet}>
      <Header/>
      <SelectMenu tabs={tabs} setTab={setCurrentIndex}/>
      <div className={styles.selectedTab} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>{CURRENT_TAB[currentTab]}</div>
      {/*<ContextMenu/>*/}
    </div>
  );
}

export default CharacterSheet;