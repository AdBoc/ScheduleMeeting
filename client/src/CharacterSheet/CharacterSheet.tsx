import React, { useState, useContext, useEffect } from 'react';
import { characterContext } from '../context/Character';
import { Tabs } from '../ts/interfaces';
import TopDisplay from './TopDisplay';
import CurrentComponent from './CurrentComponent';
import './styles.scss';

const CharacterSheet: React.FC = () => {
  const [currentView, setCurrentView] = useState<Tabs>("stats");
  const { character } = useContext(characterContext);

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(character));
  }, [character]);

  const toggleView = ({ target }: any) => setCurrentView(target.name);

  return (
    <>
      <TopDisplay />
      <div className="c-btns">
        <button className="c-btn" onClick={toggleView} name="stats">Stats</button>
        <button className="c-btn" onClick={toggleView} name="skills">Skills</button>
        <button className="c-btn" onClick={toggleView} name="savingThrows">Saving Throws</button>
        <button className="c-btn" onClick={toggleView} name="allActions">Actions</button>
        <button className="c-btn" onClick={toggleView} name="equipment">Equipment</button>
        <button className="c-btn" onClick={toggleView} name="story">Background</button>
        <button className="c-btn" onClick={toggleView} name="quickAccess">Quick Access</button>
      </div>
      <CurrentComponent current={currentView} />
    </>
  )
};

export default CharacterSheet;
