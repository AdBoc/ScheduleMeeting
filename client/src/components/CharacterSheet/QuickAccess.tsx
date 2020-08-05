import React, { useContext } from 'react';
import StatButtons from '../Reusable/StatButtons';
import { characterContext } from '../../context/character';
import { initialCharacter } from '../../context/sheetReducer';
import { history } from '../../helpers/history';

const QuickAccess: React.FC = () => {

  const { character, dispatch } = useContext(characterContext);

  const clearStorage = () => {
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(initialCharacter));
    history.go(0);
  }

  return (
    <div className="sheet--view--story">
      <StatButtons prop={character.MainStats.Level} propName="MainStats.Level" dispatch={dispatch} fieldName="Level" />
      <StatButtons prop={character.MainStats.HitPoints} propName="MainStats.HitPoints" dispatch={dispatch} fieldName="Max Hit Points" />
      <StatButtons prop={character.MainStats.ArmorClass} propName="MainStats.ArmorClass" dispatch={dispatch} fieldName="Armor Class" />
      <StatButtons prop={character.MainStats.Initiative} propName="MainStats.Initiative" dispatch={dispatch} fieldName="Initiaive" />
      <StatButtons prop={character.MainStats.PassivePercepion} propName="MainStats.PassivePercepion" dispatch={dispatch} fieldName="Passive Perception" />
      <StatButtons prop={character.MainStats.Speed} propName="MainStats.Speed" dispatch={dispatch} fieldName="Speed" />
      <StatButtons prop={character.MainStats.Inspiration} propName="MainStats.Inspiration" dispatch={dispatch} fieldName="Inspiration Points" />
      <button onClick={clearStorage}>Clear Local Storage</button>
      <button>Store data on server</button>
      <button>Revert changes</button>
      <button>Delete character</button>
    </div>
  )
}

export default QuickAccess;
