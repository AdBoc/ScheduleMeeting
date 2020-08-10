import React, { useContext, useState } from 'react';
import StatButtons from '../../components/StatButtons';
import { characterContext } from '../../context/Character';
import { initialCharacter } from '../../context/Character/reducer';
import { history } from '../../Services/History';
import { Link } from 'react-router-dom';
import ChangeUser from './ChangeUser';
import InputNumber from '../../components/InputNumber';

const QuickAccess: React.FC = () => {
  const [playerVisiblity, setPlayerVisiblity] = useState(false);
  const { character } = useContext(characterContext);

  const clearStorage = () => {
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(initialCharacter));
    history.go(0);
  };

  const changeUser = () => setPlayerVisiblity(prev => !prev);

  return (
    <div className="c-story">
      <InputNumber prop={character.MainStats.HitPoints} propName="MainStats.HitPoints" fieldName="Max Hit Points" />
      <InputNumber prop={character.MainStats.Speed} propName="MainStats.Speed" fieldName="Speed" />
      <StatButtons prop={character.MainStats.Level} propName="MainStats.Level" fieldName="Level" />
      <StatButtons prop={character.MainStats.ArmorClass} propName="MainStats.ArmorClass" fieldName="Armor Class" />
      <StatButtons prop={character.MainStats.Initiative} propName="MainStats.Initiative" fieldName="Initiaive" />
      <StatButtons prop={character.MainStats.PassivePercepion} propName="MainStats.PassivePercepion" fieldName="Passive Perception" />
      <StatButtons prop={character.MainStats.Inspiration} propName="MainStats.Inspiration" fieldName="Inspiration Points" />
      {/* <button className="g-btn">Send To Backend</button> */}
      <Link to="/"><button className="g-btn">Show Calendar</button></Link>
      <button className="g-btn" onClick={changeUser}>Change User</button>
      <button className="g-btn g-btn--red" onClick={clearStorage}>Clear Local Storage</button>
      {/* <button className="g-btn g-btn--red">Delete character</button> */}
      {playerVisiblity && <ChangeUser setVisibility={setPlayerVisiblity} />}
    </div>
  )
};

export default QuickAccess;
