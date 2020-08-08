import React, { useState, useContext, useEffect } from 'react';
import { SavingThrows, Skills, Stats, Story, Attacks, Equipment, QuickAccess } from './index';
import { characterContext } from '../context/Character';
import { Tabs } from '../ts/interfaces';
import './CharacterSheet.scss';
import TopDisplay from './TopDisplay';

const CharacterSheet: React.FC = () => {
  const [currentView, setCurrentView] = useState<Tabs>("stats");
  const { character } = useContext(characterContext);

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(character));
  }, [character]);

  const toggleView = ({ target }: any) => setCurrentView(target.name);

  const renderView = () => {
    switch (currentView) {
      case 'stats':
        return <Stats />
      case 'skills':
        return <Skills />
      case 'savingThrows':
        return <SavingThrows />
      case 'attacks':
        return <Attacks />
      case 'equipment':
        return <Equipment />
      case 'story':
        return <Story />
      case 'quickAccess':
        return <QuickAccess />
    };
  };

  return (
    <>
      <TopDisplay />
      <div className="c-sheet__buttons">
        <button className="button" onClick={toggleView} name="stats">Stats</button>
        <button className="button" onClick={toggleView} name="skills">Skills</button>
        <button className="button" onClick={toggleView} name="savingThrows">Saving Throws</button>
        <button className="button" onClick={toggleView} name="attacks">Attacks</button>
        <button className="button" onClick={toggleView} name="equipment">Equipment</button>
        <button className="button" onClick={toggleView} name="story">Background</button>
        <button className="button" onClick={toggleView} name="quickAccess">Quick Access</button>
      </div>
      {renderView()}
    </>
  )
};

export default CharacterSheet;
