import React, { useState, useReducer } from 'react';
import { SavingThrows, Skills, Stats, Story, Attacks, Equipment, QuickAccess } from './index';
// import NumberSelect from '../Reusable/Select';

import "./Sheet.scss";
import { sheetReducer } from './reducer/sheetReducer';
import { initialCharacter } from './reducer/sheetReducer';
// import { Types } from './reducer/sheetReducer';

const CharacterSheet: React.FC = () => {

  const [currentView, setCurrentView] = useState("stats");
  const [character, dispatch] = useReducer(sheetReducer, initialCharacter);

  const toggleView = ({ target }: any) => {
    setCurrentView(target.name);
  };

  // const handleStatChange = ({ target }: any) => {
  //   dispatch({ type: Types.CHANGE_STAT, payload: { property: target.name, newValue: target.value } });
  // };

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
      case 'quickAccess':
        return <QuickAccess character={character} dispatch={dispatch} />
    }
  };

  console.log(character);

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
        <button className="sheet--button" onClick={toggleView} name="quickAccess">QuickAccess</button>
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



{/* <div className="sheet--main-stats--stat">
          <NumberSelect range={[1, 50]} name="ArmorClass" value={character.MainStats.ArmorClass} onChange={handleStatChange} />
          <p>ArmorClass</p>
        </div>
        <div className="sheet--main-stats--stat">
          <NumberSelect range={[1, 40]} name="Initiative" value={character.MainStats.Initiative} onChange={handleStatChange} />
          <p>Initiative</p>
        </div>
        <div className="sheet--main-stats--stat">
          <label><input type="number" className="sheet--main-stats--stat--val" name="Speed" value={character.MainStats.Speed} onChange={handleStatChange} />
          Speed</label>
        </div>
        <div className="sheet--main-stats--stat">
          <NumberSelect range={[1, 30]} name="PassivePercepion" value={character.MainStats.PassivePercepion} onChange={handleStatChange} />
          <p>Passive Percepion</p>
        </div>
        <div className="sheet--main-stats--stat">
          <label><p className="sheet--main-stats--stat--val">{calculateProficiency(character.Level)}</p>
          Proficiency Bonus</label>
        </div>
        <div className="sheet--main-stats--stat">
          <label><input type="number" className="sheet--main-stats--stat--val" name="Inspiration" value={character.MainStats.Inspiration} onChange={handleStatChange} />
          Inspiration</label>
        </div> */}