import React, { useContext, useState } from 'react';
import { characterContext } from '../../context/Character';
import { initialCharacter, Types } from '../../context/Character/reducer';
import { history } from '../../Services/History';
import { Link } from 'react-router-dom';
import { apiService } from '../../Services/FetchAPI'
import StatButtons from '../../components/StatButtons';
import ChangeUserAndData from './ChangeUserAndData';
import InputNumber from '../../components/InputNumber';

const QuickAccess: React.FC = () => {
  const [playerVisiblity, setPlayerVisiblity] = useState(false);
  const { character, dispatch } = useContext(characterContext);

  const handleInspiration = () => dispatch({ type: Types.CHANGE_INSPIRATION, payload: { newValue: !character.Other.Inspiration } });

  const clearStorage = () => {
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(initialCharacter));
    history.go(0);
  };

  const sendToBackend = async () => {
    if (!localStorage.getItem("user"))
      return
    await apiService.sendCharacter();
    // return notification error "pick user"
    // const status = await apiService.sendCharacter();
    // if (status === 200)
    // return notification success
    // return notification data sending error 
  };

  return (
    <div className="c-story">
      <InputNumber prop={character.MainStats.HitPoints} propName="MainStats.HitPoints" fieldName="Max Hit Points" />
      <InputNumber prop={character.MainStats.Speed} propName="MainStats.Speed" fieldName="Speed" />
      <StatButtons prop={character.MainStats.Level} propName="MainStats.Level" fieldName="Level" />
      <StatButtons prop={character.MainStats.ArmorClass} propName="MainStats.ArmorClass" fieldName="Armor Class" />
      <StatButtons prop={character.MainStats.Initiative} propName="MainStats.Initiative" fieldName="Initiative" />
      <StatButtons prop={character.MainStats.PassivePercepion} propName="MainStats.PassivePercepion" fieldName="Passive Perception" />
      <div className="c-ins-checkbox">
        <label htmlFor="c-checkbox__box">Inspiration</label>
        <input className="c-ins-checkbox__box" id="c-checkbox__box" type="checkbox" checked={character.Other.Inspiration} onChange={handleInspiration} />
      </div>
      <Link to="/"><button className="g-btn section-break">Show Calendar</button></Link>
      <button className="g-btn" onClick={sendToBackend}>Store in DB</button>
      <button className="g-btn" onClick={() => setPlayerVisiblity(prev => !prev)}>Change User</button>
      {playerVisiblity && <ChangeUserAndData setVisibility={setPlayerVisiblity} />}
      <button className="g-btn g-btn--red" onClick={clearStorage}>Clear Local Storage</button>
    </div>
  )
};

export default QuickAccess;
