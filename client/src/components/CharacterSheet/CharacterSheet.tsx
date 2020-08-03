import React, { useState } from 'react';
import Stats from './Stats';
import Skills from './Skills';
import SavingThrows from './SavingThrows';
import Attacks from './Attacks';
import Equipment from './Equipment';
import Story from './Story';

import "./Sheet.scss";
import { useSheet } from '../../hooks/useSheet';

const CharacterSheet: React.FC = () => {

  const { newChar } = useSheet();
  const [currentView, setCurrentView] = useState("stats");
  const [character, setCharacter] = useState(newChar);

  const toggleView = ({ target }: any) => {
    setCurrentView(target.name);
  };

  const onChange = () => {
    localStorage.setItem('character', JSON.stringify(character));
  };

  const calculateProficiency = (charLvl: number) => {
    if (charLvl === 0)
      return 2;
    return Math.floor((charLvl - 1) / 4) + 2;
  };

  const renderView = () => {
    switch (currentView) {
      case 'stats':
        return <Stats character={character} />
      case 'skills':
        return <Skills character={character} />
      case 'savingThrows':
        return <SavingThrows character={character} />
      case 'attacks':
        return <Attacks character={character} />
      case 'equipment':
        return <Equipment character={character} />
      case 'story':
        return <Story character={character} />
    }
  };

  return (
    <>
      <div className="sheet--top">
        <p className="sheet--top--level">{character.Level}</p>
        <p className="sheet--top--name">{character.PlayerName}</p>
        <p className="sheet--top--hp">{character.HitPoints}/20 HP</p>
      </div>
      <div className="sheet--main-stats">
        <div className="sheet--main-stats--stat">
          <p className="sheet--main-stats--stat--val">{character.MainStats.ArmorClass}</p>
          <p>Armor Class</p>
        </div>
        <div className="sheet--main-stats--stat">
          <p className="sheet--main-stats--stat--val">{character.MainStats.Initiative}</p>
          <p>Initiative</p>
        </div>
        <div className="sheet--main-stats--stat">
          <p className="sheet--main-stats--stat--val">{character.MainStats.Speed}</p>
          <p>Speed</p>
        </div>
        <div className="sheet--main-stats--stat">
          <p className="sheet--main-stats--stat--val">{character.MainStats.PassivePercepion}</p>
          <p>Passive Percepion</p>
        </div>
        <div className="sheet--main-stats--stat">
          <p className="sheet--main-stats--stat--val">{calculateProficiency(character.Level)}</p>
          <p>Proficiency Bonus</p>
        </div>
        <div className="sheet--main-stats--stat">
          <p className="sheet--main-stats--stat--val">{character.MainStats.Inspiration}</p>
          <p>Inspiration</p>
        </div>
      </div>
      <div className="sheet--buttons">
        <button className="sheet--button" onClick={toggleView} name="stats">Stats</button>
        <button className="sheet--button" onClick={toggleView} name="skills">Skills</button>
        <button className="sheet--button" onClick={toggleView} name="savingThrows">Saving Throws</button>
        <button className="sheet--button" onClick={toggleView} name="attacks">Attacks</button>
        <button className="sheet--button" onClick={toggleView} name="equipment">Equipment</button>
        <button className="sheet--button" onClick={toggleView} name="story">Story</button>
      </div>
      {renderView()}
    </>
  )
};

export default CharacterSheet;

//get from local storage if doesnt exist then create new one 
//save to api when something is changed via button click 
//download data
//revert changes