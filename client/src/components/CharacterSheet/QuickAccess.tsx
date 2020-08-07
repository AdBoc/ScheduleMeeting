import React, { useContext } from 'react';
import StatButtons from '../Reusable/StatButtons';
import { characterContext } from '../../context/character';
import { initialCharacter, Types } from '../../context/sheetReducer';
import { history } from '../../helpers/history';

const QuickAccess: React.FC = () => {

  const { dispatch, character } = useContext(characterContext);

  const clearStorage = () => {
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(initialCharacter));
    history.go(0);
  }

  const changeSpeed = ({ target }: any) => {
    dispatch({ type: Types.CHANGE_SPEED, payload: { newSpeed: target.value } });
  }

  return (
    <div className="c-story">
      <StatButtons prop={character.MainStats.Level} propName="MainStats.Level" fieldName="Level" />
      <StatButtons prop={character.MainStats.HitPoints} propName="MainStats.HitPoints" fieldName="Max Hit Points" />
      <StatButtons prop={character.MainStats.ArmorClass} propName="MainStats.ArmorClass" fieldName="Armor Class" />
      <StatButtons prop={character.MainStats.Initiative} propName="MainStats.Initiative" fieldName="Initiaive" />
      <StatButtons prop={character.MainStats.PassivePercepion} propName="MainStats.PassivePercepion" fieldName="Passive Perception" />
      <label>Speed<input type="number" value={character.MainStats.Speed} onChange={changeSpeed} /></label>
      <StatButtons prop={character.MainStats.Inspiration} propName="MainStats.Inspiration" fieldName="Inspiration Points" />
      <div className="c-story__buttons">
        <button className="g-btn">Send To Backend</button>
        <button className="g-btn">Show Calendar</button>
        <button className="g-btn">Change User</button>
        <button className="g-btn" onClick={clearStorage}>Clear Local Storage</button>
        <button className="g-btn g-btn--red">Delete character</button>
      </div>
    </div>
  )
}

export default QuickAccess;
