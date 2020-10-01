import React, {useContext, useRef, useState} from "react";

import {characterContext} from "../../context/Character";

import {Types} from "../../context/Character/reducer";
import {useOutsideClick} from "../../hooks/useOutsideClick";

const TopHpView: React.FC = () => {
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


  const handleHpDiff = (e: any) => {
    if (!e.target.value) return setNewHpDIff("");
    if (isInverse) return setNewHpDIff(-Math.abs(parseInt(e.target.value)));
    setNewHpDIff(parseInt(e.target.value));
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

  const styleHp = () => {
    let className = "c-sheet__hp";
    let result = character.TemporaryHitPoints / character.MainStats.HitPoints;
    if (result <= 0.25)
      className += " --low-hp";
    else if (result <= 0.5)
      className += " --mid-hp";
    return className;
  };

  const handleIncrement = () => {
    if (character.TemporaryHitPoints === character.MainStats.HitPoints) return;
    dispatch({type: Types.INCREMENT_STAT, payload: {property: "TemporaryHitPoints"}});
  }

  const handleDecrement = () => {
    if (character.TemporaryHitPoints === 0) return;
    dispatch({type: Types.DECREMENT_STAT, payload: {property: "TemporaryHitPoints"}});
  }

  const handleInverse = () => {
    setIsInverse(prev => !prev);
    setNewHpDIff(prev => -prev);
  }

  return (
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
  )
}

export default TopHpView;