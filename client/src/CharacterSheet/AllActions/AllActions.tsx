import React, { useState } from 'react';
import { Attacks, Actions, Spells, Cantrips, Effects, AddAction, AddAttack, AddSpell, AddCantrip, AddEffect } from './index';
import './styles.scss';

const AllActions: React.FC = () => {
  const [renderForm, setRenderForm] = useState(false);
  const [activeTab, setActiveTab] = useState('attacks');
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleClick = ({ target }: any) => setActiveTab(target.name);
  const handleClose = () => {
    setRenderForm(prev => !prev);
    setIsButtonActive(prev => !prev);
  };

  const ACTIVE_TAB: { [comp: string]: JSX.Element } = {
    attacks: <Attacks />,
    spells: <Spells />,
    cantrips: <Cantrips />,
    actions: <Actions />,
    effects: <Effects />
  }

  const ACTIVE_ADD: { [comp: string]: JSX.Element } = {
    attacks: <AddAttack handleClose={handleClose} />,
    spells: <AddSpell />,
    cantrips: <AddCantrip />,
    actions: <AddAction />,
    effects: <AddEffect handleClose={handleClose} />
  }

  return (
    <>
      <div className="c-action__btns">
        <button className={`c-action__btns__btn ${activeTab === "attacks" ? "--active " : ""}`} onClick={handleClick} name="attacks">Attacks</button>
        <button className={`c-action__btns__btn ${activeTab === "spells" ? "--active " : ""}`} onClick={handleClick} name="spells">Spells</button>
        <button className={`c-action__btns__btn ${activeTab === "cantrips" ? "--active " : ""}`} onClick={handleClick} name="cantrips">Cantrips</button>
        <button className={`c-action__btns__btn ${activeTab === "actions" ? "--active " : ""}`} onClick={handleClick} name="actions" >Actions</button>
        <button className={`c-action__btns__btn ${activeTab === "effects" ? "--active " : ""}`} onClick={handleClick} name="effects">Effects</button>
        <button className={`c-action__btns__btn ${isButtonActive ? "--add" : ""}`} onClick={handleClose}>+Add</button>
      </div>
      {renderForm && ACTIVE_ADD[activeTab]}
      <div className="c-action__tab">
        {ACTIVE_TAB[activeTab]}
      </div>
    </>
  )
}

export default AllActions;
