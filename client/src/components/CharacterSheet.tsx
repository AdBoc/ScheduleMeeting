import React, { useState, useContext, useEffect } from 'react';
import { SavingThrows, Skills, Stats, Story, Attacks, Equipment, QuickAccess } from './CharacterSheet/index';

import { Types } from '../context/sheetReducer';
import { characterContext } from '../context/character';
import { Tabs } from '../ts/interfaces';
import './CharacterSheet/Sheet.scss';

const CharacterSheet: React.FC = () => {

  const [currentView, setCurrentView] = useState<Tabs>("equipment");
  const { character, dispatch } = useContext(characterContext);

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(character));
  }, [character]);


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
    };
  };

  return (
    <>
      <div className="c-sheet">
        <div className="c-sheet__player">
          <div className="c-player">
            <p className="c-player__name">{character.Story.Name}</p>
            <p className="c-player__details">{character.Story.Race} {character.Story.Class} {character.MainStats.Level}</p>
          </div>
          <div className="c-sheet__hp">
            <button className="decrement-hp" onClick={decrementHp} aria-label="decrement hp" />
            {character.TemporaryHitPoints}/{character.MainStats.HitPoints} HP
            <button className="increment-hp" onClick={incrementHp} aria-label="increment hp" />
          </div>
        </div>
        <div className="c-sheet__stats">
          <div className="c-stat">
            <p className="c-stat__value">{character.MainStats.ArmorClass}</p>
            <p className="c-stat__label">Armor Class</p>
          </div>
          <div className="c-stat">
            <p className="c-stat__value">{character.MainStats.Initiative}</p>
            <p className="c-stat__label">Initiative</p>
          </div>
          <div className="c-stat">
            <p className="c-stat__value">{character.MainStats.PassivePercepion}</p>
            <p className="c-stat__label">Passive Percepion</p>
          </div>
          <div className="c-stat">
            <p className="c-stat__value">{calculateProficiency(character.MainStats.Level)}</p>
            <p className="c-stat__label">Proficiency Bonus</p>
          </div>
        </div>
      </div>
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

//jesli local sotrage jest pusty to NAJPIERW SPRAWDZA CZY ISTNIEJE W API TAKI UZYTKOWNIK i jesli istnieje to pobiera z api jak nie no to tworzy nowa postac
//SET USER w kalendarzu kazdy button ma przycisk ktory ustawia w localStorage usera, np klikniecie przycisku potrek ustawia w local user: potrek,
//przy wysylaniu do api wysylana jest tresci local sorage i informacja o userze, przy getowaniu tez jest wysylane info o userze