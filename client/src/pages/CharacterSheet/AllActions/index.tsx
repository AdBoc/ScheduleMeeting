import React, {useState} from 'react';
import Attacks from "./Attacks";
import Spells from "./Spells";
import Actions from "./Actions";
import Effects from "./Effects/Effects";
import styles from "./allActions.module.scss";

const AllActions = () => {
  const [activeTab, setActiveTab] = useState("attacks");

  const ACTIVE_TAB: { [tab: string]: JSX.Element } = {
    attacks: <Attacks/>,
    spells: <Spells/>,
    actions: <Actions/>,
    effects: <Effects/>
  }

  return (
    <>
      <div className={styles.tabsButtons}>
        <button className={styles.tabButton} name="attacks" onClick={({target}: any) => {setActiveTab(target.name)}}>Attacks</button>
        <button className={styles.tabButton} name="spells" onClick={({target}: any) => {setActiveTab(target.name)}}>Spells</button>
        <button className={styles.tabButton} name="actions" onClick={({target}: any) => {setActiveTab(target.name)}}>Actions</button>
        <button className={styles.tabButton} name="effects" onClick={({target}: any) => {setActiveTab(target.name)}}>Effects</button>
      </div>
      <div>
        {ACTIVE_TAB[activeTab]}
      </div>
    </>
  );
}

export default AllActions;