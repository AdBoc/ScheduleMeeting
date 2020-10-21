import React, {useState} from 'react';
import Attacks from "./Attacks";
import Spells from "./Spells";
import Actions from "./Actions";
import Effects from "./Effects/Effects";

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
      <div>
        <button name="attacks" onClick={({target}: any) => {setActiveTab(target.name)}}>Attacks</button>
        <button name="spells" onClick={({target}: any) => {setActiveTab(target.name)}}>Spells</button>
        <button name="actions" onClick={({target}: any) => {setActiveTab(target.name)}}>Actions</button>
        <button name="effects" onClick={({target}: any) => {setActiveTab(target.name)}}>Effects</button>
      </div>
      <div>
        {ACTIVE_TAB[activeTab]}
      </div>
    </>
  );
}

export default AllActions;