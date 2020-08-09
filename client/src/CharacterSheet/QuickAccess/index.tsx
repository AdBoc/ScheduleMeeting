import React, { useContext, useState } from 'react';
import StatButtons from '../../components/StatButtons';
import { characterContext } from '../../context/Character';
import { initialCharacter, Types } from '../../context/Character/reducer';
import { history } from '../../Services/History';
import { Link } from 'react-router-dom';
import ChangeUser from './ChangeUser';

const QuickAccess: React.FC = () => {
  const [playerVisiblity, setPlayerVisiblity] = useState(false);
  const { dispatch, character } = useContext(characterContext);

  const clearStorage = () => {
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(initialCharacter));
    history.go(0);
  };

  const changeSpeed = ({ target }: any) => dispatch({ type: Types.CHANGE_STAT, payload: { property: "MainStats.Speed", newValue: target.value } });
  const changeUser = () => setPlayerVisiblity(prev => !prev);

  return (
    <div className="c-story">
      <StatButtons prop={character.MainStats.Level} propName="MainStats.Level" fieldName="Level" />
      <StatButtons prop={character.MainStats.HitPoints} propName="MainStats.HitPoints" fieldName="Max Hit Points" />
      <StatButtons prop={character.MainStats.ArmorClass} propName="MainStats.ArmorClass" fieldName="Armor Class" />
      <StatButtons prop={character.MainStats.Initiative} propName="MainStats.Initiative" fieldName="Initiaive" />
      <StatButtons prop={character.MainStats.PassivePercepion} propName="MainStats.PassivePercepion" fieldName="Passive Perception" />
      <StatButtons prop={character.MainStats.Inspiration} propName="MainStats.Inspiration" fieldName="Inspiration Points" />
      <div className="g-input-num">
        <p className="g-input-num__label">Speed</p>
        <input className="g-input-num__val" type="number" value={character.MainStats.Speed} onChange={changeSpeed} /></div>
      <div className="c-story__buttons">
        {/* <button className="g-btn">Send To Backend</button> */}
        <Link to="/"><button className="g-btn">Show Calendar</button></Link>
        <button className="g-btn" onClick={changeUser}>Change User</button>
        <button className="g-btn g-btn--red" onClick={clearStorage}>Clear Local Storage</button>
        {/* <button className="g-btn g-btn--red">Delete character</button> */}
        {playerVisiblity && <ChangeUser setVisibility={setPlayerVisiblity} />}
      </div>
    </div>
  )
};

export default QuickAccess;
