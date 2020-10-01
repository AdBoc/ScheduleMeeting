import React, {useContext, useRef, useState} from 'react';

import {characterContext} from '../../context/Character';
import {useForm} from 'react-hook-form';
import {useOutsideClick} from "../../hooks/useOutsideClick";

import {Types} from '../../context/Character/reducer';

import './styles.scss';

const DiceSim: React.FC<{ handleDiceRender: () => void }> = ({handleDiceRender}) => {
  const {character, dispatch} = useContext(characterContext);
  const {register, handleSubmit} = useForm();

  const [result, setResult] = useState<null | number>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const onSubmit = handleSubmit((data) => dispatch({
    type: Types.ADD_TO_ARRAY,
    payload: {property: "DiceSim.dices", newValue: {number: +data.number, value: +data.value}}
  }));

  const diceRef = useRef(null);
  useOutsideClick(diceRef, () => {
    handleDiceRender();
  });

  const handleRoll = (times: number, dice: number) => () => {
    if (isDeleteMode) return dispatch({type: Types.DELETE_DICE, payload: {times, dice}});
    let sum = 0;
    for (let i = 0; i < times; i++) {
      sum += Math.ceil(Math.random() * dice); //return Math.floor(Math.random() * (times * dice - dice + 1)) + dice
    }
    setResult(sum);
  };

  return (
    <div className="dice-layer">
      <div className="dice-sim" ref={diceRef}>
        <div className="dice-result">{result}</div>
        <div className="dice-dices">
          {character.DiceSim.dices.map((dice, index) =>
            <button key={index} className={`dice-dice ${isDeleteMode && 'dice-dice--delete'}`}
                    onClick={handleRoll(dice.number, dice.value)}>{dice.number}D{dice.value}</button>
          )}
        </div>
        <form className="dice-form" onSubmit={onSubmit}>
          <input className="dice-input" type="number" name="number" ref={register} autoComplete="off" required/>
          <p className="dice-label">D</p>
          <input className="dice-input" type="number" name="value" ref={register} autoComplete="off" required/>
          <input className="dice-btn" type="submit" value="Add"/>
        </form>
        <img className="dice-trash" alt="delete dice" src={require('../../assets/trash-can.svg')}
             onClick={() => setIsDeleteMode(prev => !prev)}/>
      </div>
    </div>
  )
};

export default DiceSim;