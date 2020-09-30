import React, {useContext} from 'react';

import {characterContext} from '../../context/Character';
import {initialCharacter, Types} from '../../context/Character/reducer';
import {history} from '../../Services/History';

import {Link} from 'react-router-dom';
import StatButtons from '../../components/StatButtons';
import InputNumber from '../../components/InputNumber';

import './styles.scss';

const QuickAccess: React.FC = () => {
  const {character, dispatch} = useContext(characterContext);

  const handleInspiration = () => dispatch({
    type: Types.CHANGE_BOOL,
    payload: {property: "Other.Inspiration", newValue: !character.Other.Inspiration}
  });
  const handleDiceSim = () => dispatch({type: Types.CHANGE_BOOL, payload: {property: "DiceSim.status", newValue: !character.DiceSim.status}});

  const deleteCharacter = () => {
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(initialCharacter));
    history.go(0);
  };

  const handleCopy = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = localStorage.getItem("character")!;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
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
      <button className="quick-btn section-break"><Link className="white-font" to="/">Show Calendar</Link></button>
      <button className="btn-w-hover" onClick={handleCopy}>Copy JSON</button>
      <button className="quick-btn quick-btn--red" onClick={deleteCharacter}>Delete Character</button>
    </div>
  )
};

export default QuickAccess;
