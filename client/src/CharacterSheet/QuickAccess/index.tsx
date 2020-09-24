import React, {useContext, useState} from 'react';
import {characterContext} from '../../context/Character';
import {initialCharacter, Types} from '../../context/Character/reducer';
import {history} from '../../Services/History';
import {Link} from 'react-router-dom';
import {apiService} from '../../Services/FetchAPI'
import {Slide, toast, ToastContainer} from 'react-toastify';
import StatButtons from '../../components/StatButtons';
import ChangeUserAndData from './ChangeUserAndData';
import InputNumber from '../../components/InputNumber';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const QuickAccess: React.FC = () => {
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const {character, dispatch} = useContext(characterContext);

  const handleInspiration = () => dispatch({
    type: Types.CHANGE_BOOL,
    payload: {property: "Other.Inspiration", newValue: !character.Other.Inspiration}
  });
  const handleDiceSim = () => dispatch({type: Types.CHANGE_BOOL, payload: {property: "DiceSim.status", newValue: !character.DiceSim.status}});

  const clearStorage = () => {
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(initialCharacter));
    history.go(0);
  };

  const handleUpload = async () => {
    if (!localStorage.getItem("user"))
      return toast.error("Firstly select user");
    const status = await apiService.sendCharacter();
    if (status === 200)
      return toast.success("Upload Successful");
    return toast.error("Error while uploading");
  };

  const handleDownload = async () => {
    if (!localStorage.getItem("user"))
      return toast.error("Firstly select user");
    const characterData = await apiService.getCharacter();
    if (characterData === "error")
      return toast.error("No data exists");
    dispatch({type: Types.SET_CHARACTER, payload: {newCharacter: JSON.parse(characterData.character)}});
    return toast.success("Changes applied");
  }

  return (
    <div className="c-story">
      <InputNumber prop={character.MainStats.HitPoints} propName="MainStats.HitPoints" fieldName="Max HP"/>
      <InputNumber prop={character.MainStats.Speed} propName="MainStats.Speed" fieldName="Speed"/>
      <hr/>
      <StatButtons prop={character.MainStats.Level} propName="MainStats.Level" fieldName="Level"/>
      <StatButtons prop={character.MainStats.ArmorClass} propName="MainStats.ArmorClass" fieldName="Armor Class"/>
      <StatButtons prop={character.MainStats.Initiative} propName="MainStats.Initiative" fieldName="Initiative"/>
      <StatButtons prop={character.MainStats.PassivePerception} propName="MainStats.PassivePerception" fieldName="Passive Perception"/>
      <hr/>
      <div className="c-ins-checkbox">
        <label htmlFor="inspiration">Inspiration</label>
        <input className="c-ins-checkbox__box" id="inspiration" type="checkbox" checked={character.Other.Inspiration} onChange={handleInspiration}/>
      </div>
      <div className="c-ins-checkbox">
        <label htmlFor="diceSim">DiceSim</label>
        <input className="c-ins-checkbox__box" id="diceSim" type="checkbox" checked={character.DiceSim.status} onChange={handleDiceSim}/>
      </div>
      <hr/>
      <Link to="/">
        <button className="quick-btn section-break">Show Calendar</button>
      </Link>
      <button className="quick-btn" onClick={handleUpload}>Store in DB</button>
      <button className="quick-btn" onClick={handleDownload}>Download Character</button>
      <button className="quick-btn" onClick={() => setPlayerVisibility(prev => !prev)}>Select User</button>
      {playerVisibility && <ChangeUserAndData setVisibility={setPlayerVisibility}/>}
      <button className="quick-btn quick-btn--red" onClick={clearStorage}>Clear Local Storage</button>
      <ToastContainer transition={Slide} autoClose={1500} pauseOnHover={false} position="bottom-center" hideProgressBar/>
    </div>
  )
};

export default QuickAccess;
