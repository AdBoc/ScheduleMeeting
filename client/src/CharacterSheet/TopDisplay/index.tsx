import React, {useContext, useRef, useState} from 'react';
import {characterContext} from '../../context/Character';
import useOutsideClick from '../../hooks/useOutsideClick';
import DiceSim from '../DiceSim';
import {Types} from '../../context/Character/reducer';
import {charMethods} from '../../Services/CharacterMethods';
import './styles.scss';

const TopDisplay = () => {
  const {character, dispatch} = useContext(characterContext);
  const [isHpInput, setIsHpInput] = useState(false);
  const [isDiceSim, setIsDiceSim] = useState(false);
  const [newHpDiff, setNewHpDIff] = useState<number | string>("");
  const [isInverse, setIsInverse] = useState(false);

  const diceRef = useRef(null);
  useOutsideClick(diceRef, () => {
    if (isDiceSim) setIsDiceSim(prev => !prev);
  });

  const hpRef = useRef(null);
  useOutsideClick(hpRef, () => {
    if (isHpInput) setIsHpInput(prev => !prev);
    setNewHpDIff("");
  });

  const styleHp = () => {
    let className = "c-sheet__hp";
    let result = character.TemporaryHitPoints / character.MainStats.HitPoints;
    if (result <= 0.25)
      className += " --low-hp";
    else if (result <= 0.5)
      className += " --mid-hp";
    return className;
  };

  const handleHpDiff = (e: any) => {
    if (!e.target.value) return setNewHpDIff("");
    if (isInverse) return setNewHpDIff(-Math.abs(parseInt(e.target.value)));
    setNewHpDIff(parseInt(e.target.value));
  }

  const handleIncrement = () => {
    if (character.TemporaryHitPoints === character.MainStats.HitPoints) return;
    dispatch({type: Types.INCREMENT_STAT, payload: {property: "TemporaryHitPoints"}});
  }

  const handleDecrement = () => {
    if (character.TemporaryHitPoints === 0) return;
    dispatch({type: Types.DECREMENT_STAT, payload: {property: "TemporaryHitPoints"}});
  }

  const handleHpSubmit = () => {
    if (!newHpDiff) return;
    const input = newHpDiff as number;
    let MaxHP = character.MainStats.HitPoints;
    let currHP = character.TemporaryHitPoints + input;
    if (currHP <= 0)
      currHP = 0;
    else if (currHP > MaxHP)
      currHP = MaxHP;
    dispatch({type: Types.CHANGE_STAT, payload: {property: "TemporaryHitPoints", newValue: currHP}});
    setNewHpDIff("");
    setIsHpInput(prev => !prev);
  }

  const handleInverse = () => {
    setIsInverse(prev => !prev);
    setNewHpDIff(prev => -prev);
  }

  return (
    <>
      <div className="c-sheet">
        <div className="c-sheet__player">
          <div className="c-player">
            <p className="c-player__name">{character.Story.Name}</p>
            <p
              className="c-player__details">{character.Story.Race} {character.Story.Class} {character.MainStats.Level ? character.MainStats.Level : null}</p>
          </div>
          <>
            <p className={styleHp()} onClick={() => setIsHpInput(prev => !prev)}>{character.TemporaryHitPoints}/{character.MainStats.HitPoints} HP</p>
            {
              isHpInput && <div className="c-sheet__hp-form" ref={hpRef}>
                  <div className="c-sheet__hp-form--top">
                      <button className="c-sheet__hp-form--top--btn" onClick={handleDecrement}>-</button>
                      <input className="c-sheet__hp-form__input" type="number" name="HpMod" value={newHpDiff} onChange={handleHpDiff} required/>
                      <button className="c-sheet__hp-form--top--btn" onClick={handleIncrement}>+</button>
                  </div>
                  <div>
                      <hr className="form-line"/>
                      <button onClick={handleInverse}>Inverse</button>
                      <hr className="form-line"/>
                      <button onClick={handleHpSubmit}>OK</button>
                  </div>
              </div>
            }
          </>
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
            <p className="c-stat__value">{character.MainStats.PassivePerception}</p>
            <p className="c-stat__label">Passive Perception</p>
          </div>
          <div className="c-stat">
            <p className="c-stat__value">{charMethods.calcProficiency(character.MainStats.Level)}</p>
            <p className="c-stat__label">Proficiency Bonus</p>
          </div>
        </div>
        {character.Other.Inspiration && <img className="inspiration-point" alt="inspiration point" src={require('../../assets/light-bulb.svg')}/>}
        {character.DiceSim.status &&
        <img className="dice-icon" alt="dice sim button" src={require('../../assets/dices.svg')} onClick={() => setIsDiceSim(prev => !prev)}/>}
      </div>
      {isDiceSim && <div className="dice-layer">
          <div ref={diceRef}><DiceSim/></div>
      </div>}
    </>
  )
};

export default React.memo(TopDisplay);
