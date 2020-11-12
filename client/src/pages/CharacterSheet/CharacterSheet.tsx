import React, {useEffect} from "react";
import {useSwipe} from "../../hooks/useSwipe";
import {setCharacter} from "../../redux/reducers";
import {useDispatch} from "react-redux";
import {useForceUpdate} from "../../hooks/useForceRerender";
import {withReduxProvider} from "../../components/ReduxProvider/ReduxProvider";
import api from "../../utils/api";

import {AllActions, Background, Equipment, Header, QuickAccess, SavingThrows, Skills, Stats} from './index';
import SelectMenu from "./SelectMenu";

import styles from './characterSheet.module.scss';
import ContextMenu from "./ContextMenu";


const CURRENT_TAB: { [key: string]: JSX.Element } = {
  allActions: <AllActions/>,
  background: <Background/>,
  equipment: <Equipment/>,
  savingThrows: <SavingThrows/>,
  skills: <Skills/>,
  stats: <Stats/>,
  quickAccess: <QuickAccess/>
};

const Character = () => {
  const {currentTab, tabs, setCurrentIndex, handleTouchEnd, handleTouchStart} = useSwipe();
  const {forceUpdate} = useForceUpdate();
  const dispatch = useDispatch();

  useEffect(() => {
    api.getCharacter().then(r => {
      if (!!r) {
        dispatch(setCharacter(JSON.parse(r)));
        forceUpdate();
      }
    });
  }, [dispatch, forceUpdate]);

  if (!("character" in localStorage)) return <div className={styles.noCharacter}><p>Cannot open character sheet with no character in local storage</p></div>;

  return (
    <div className={styles.characterSheet}>
      <Header/>
      <SelectMenu tabs={tabs} setTab={setCurrentIndex}/>
      <div className={styles.selectedTab} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>{CURRENT_TAB[currentTab]}</div>
      <ContextMenu/>
    </div>
  );
}

export default withReduxProvider(Character);
