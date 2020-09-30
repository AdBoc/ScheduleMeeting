import React, {useContext, useState} from 'react';

import {characterContext} from '../../context/Character';

import {Actions, AddAttack, AddEffect, AddSpell, Attacks, Effects, Spells} from './index';

import './styles.scss';

const AllActions: React.FC = () => {
  const {character} = useContext(characterContext);
  const [renderForm, setRenderForm] = useState(false);
  const [activeTab, setActiveTab] = useState('attacks');
  const [isButtonActive, setIsButtonActive] = useState(false);

  let activeEffects = Object.values(character.Effects).filter((effect) => effect.active === true).length;
  const handleClick = ({target}: any) => setActiveTab(target.name);
  const handleClose = () => {
    setRenderForm(prev => !prev);
    setIsButtonActive(prev => !prev);
  };

  const ACTIVE_TAB: { [comp: string]: JSX.Element } = {
    attacks: <Attacks/>,
    spells: <Spells/>,
    actions: <Actions/>,
    effects: <Effects/>
  }

  const ACTIVE_ADD: { [comp: string]: JSX.Element | null } = {
    attacks: <AddAttack handleClose={handleClose}/>,
    spells: <AddSpell handleClose={handleClose}/>,
    actions: null,
    effects: <AddEffect handleClose={handleClose}/>
  }

  return (
    <>
      <div className="c-action-btns">
        <button className={`c-action-btns__btn ${activeTab === "attacks" ? "--active " : ""}`} onClick={handleClick} name="attacks">Attacks</button>
        <button className={`c-action-btns__btn ${activeTab === "spells" ? "--active " : ""}`} onClick={handleClick} name="spells">Spells</button>
        <button className={`c-action-btns__btn ${activeTab === "actions" ? "--active " : ""}`} onClick={handleClick} name="actions">Actions</button>
        <button className={`c-action-btns__btn ${activeTab === "effects" ? "--active" : ""}`} onClick={handleClick}
                name="effects">Effects{activeEffects !== 0 ?
          <span className={`c-effects-counter ${activeTab === "effects" ? "c-effects-counter--active" : ""}`}>{activeEffects}</span> : null}</button>
        <button className={`c-action-btns__btn ${isButtonActive ? "--add" : ""}`} onClick={handleClose}>+Add</button>
      </div>
      {renderForm && ACTIVE_ADD[activeTab]}
      <div className="c-action__tab">
        {ACTIVE_TAB[activeTab]}
      </div>
    </>
  )
}

export default AllActions;
