import React, { useState, useContext } from 'react';
import { SavingThrows, Skills, Stats, Story, Attacks, Equipment, QuickAccess } from './index';

import "./Sheet.scss";
import { Types } from '../../context/sheetReducer';
import { characterContext } from '../../context/character';

const CharacterSheet: React.FC = () => {

  const [currentView, setCurrentView] = useState("stats");
  const { character, dispatch } = useContext(characterContext);

  const toggleView = ({ target }: any) => {
    setCurrentView(target.name);
  };

  const incrementHp = () => {
    dispatch({ type: Types.INCREMENT_STAT, payload: { property: "TemporaryHitPoints" } });
  };

  const decrementHp = () => {
    dispatch({ type: Types.DECREMENT_STAT, payload: { property: "TemporaryHitPoints" } });
  };

  const calculateProficiency = (charLvl: number) => {
    if (charLvl === 0)
      return 2;
    return Math.floor((charLvl - 1) / 4) + 2;
  };

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
    }
  };

  return (
    <>
      <div className="sheet--top">
        <p className="sheet--top--level">{character.MainStats.Level}</p>
        <p className="sheet--top--name">{character.PlayerName}</p>
        <div className="sheet--top--hp">
          <button className="span-before" onClick={decrementHp} />
          {character.TemporaryHitPoints}/{character.MainStats.HitPoints} HP
          <button className="span-after" onClick={incrementHp} />
        </div>
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
          <p className="sheet--main-stats--stat--val">{calculateProficiency(character.MainStats.Level)}</p>
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
        <button className="sheet--button" onClick={toggleView} name="quickAccess">Quick Access</button>
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
