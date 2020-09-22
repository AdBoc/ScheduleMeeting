import React, {useContext, useState} from 'react';
import {characterContext} from '../../context/Character';
import {useForm} from 'react-hook-form';
import {Types} from '../../context/Character/reducer';
import './styles.scss';

const DiceSim = () => {
  const {character, dispatch} = useContext(characterContext);
  const {register, handleSubmit} = useForm();
  const [result, setResult] = useState<null | number>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const onSubmit = handleSubmit((data) => dispatch({
    type: Types.ADD_TO_ARRAY,
    payload: {property: "DiceSim.dices", newValue: {number: +data.number, value: +data.value}}
  }));

  const handleRoll = (times: number, dice: number) => () => {
    if (isDeleteMode) return dispatch({type: Types.DELETE_DICE, payload: {times, dice}});
    let sum = 0;
    for (let i = 0; i < times; i++) {
      sum += Math.ceil(Math.random() * dice); //return Math.floor(Math.random() * (times * dice - dice + 1)) + dice
    }
    setResult(sum);
  };

  const handleEditMode = () => setIsDeleteMode(prev => !prev);

  return (
    <div className="dice-sim">
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
           onClick={handleEditMode}/>
    </div>
  )
};

export default DiceSim;