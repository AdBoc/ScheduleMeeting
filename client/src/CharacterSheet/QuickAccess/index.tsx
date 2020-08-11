import React, { useContext, useState } from 'react';
import StatButtons from '../../components/StatButtons';
import { characterContext } from '../../context/Character';
import { initialCharacter } from '../../context/Character/reducer';
import { history } from '../../Services/History';
import { Link } from 'react-router-dom';
import ChangeUserAndData from './ChangeUserAndData';
import InputNumber from '../../components/InputNumber';
import { apiService } from '../../Services/FetchAPI';

const QuickAccess: React.FC = () => {
  const [playerVisiblity, setPlayerVisiblity] = useState(false);
  const { character } = useContext(characterContext);

  const clearStorage = () => {
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(initialCharacter));
    history.go(0);
  };

  const changeUser = () => setPlayerVisiblity(prev => !prev);

  const sendToBackend = () => {
    if (!localStorage.getItem("user")) {
      alert("Choose user first");
      return;
    }
    apiService.sendCharacter();
  };

  return (
    <div className="c-story">
      <InputNumber prop={character.MainStats.HitPoints} propName="MainStats.HitPoints" fieldName="Max Hit Points" />
      <InputNumber prop={character.MainStats.Speed} propName="MainStats.Speed" fieldName="Speed" />
      <StatButtons prop={character.MainStats.Level} propName="MainStats.Level" fieldName="Level" />
      <StatButtons prop={character.MainStats.ArmorClass} propName="MainStats.ArmorClass" fieldName="Armor Class" />
      <StatButtons prop={character.MainStats.Initiative} propName="MainStats.Initiative" fieldName="Initiaive" />
      <StatButtons prop={character.MainStats.PassivePercepion} propName="MainStats.PassivePercepion" fieldName="Passive Perception" />
      <StatButtons prop={character.MainStats.Inspiration} propName="MainStats.Inspiration" fieldName="Inspiration Points" />
      <Link to="/"><button className="g-btn section-break">Show Calendar</button></Link>
      <button className="g-btn" onClick={sendToBackend}>Store in DB</button>
      <button className="g-btn" onClick={changeUser}>Change User</button>
      {playerVisiblity && <ChangeUserAndData setVisibility={setPlayerVisiblity} />}
      <button className="g-btn g-btn--red" onClick={clearStorage}>Clear Local Storage</button>
      {/* <button className="g-btn g-btn--red">Delete character</button> */}
    </div>
  )
};

export default QuickAccess;
