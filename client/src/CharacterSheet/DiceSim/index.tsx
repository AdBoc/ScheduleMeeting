import React, { useContext, useState } from 'react';
import { characterContext } from '../../context/Character';
import { useForm } from 'react-hook-form';
import { Types } from '../../context/Character/reducer';
import './styles.scss';

const DiceSim = () => {
  const { character, dispatch } = useContext(characterContext);
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState<null | number>(null);
  const onSubmit = handleSubmit((data) => dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: "DiceSim.dices", newValue: { number: +data.number, value: +data.value } } }));

  const handleRoll = (times: number, dice: number) => () => {
    let sum = 0;
    for (let i = 0; i < times; i++) {
      sum += Math.ceil(Math.random() * dice); //return Math.floor(Math.random() * (times * dice - dice + 1)) + dice
    }
    setResult(sum);
  };

  return (
    <div className="dice-sim">
      <div className="dice-result">{result}</div>
      <div className="dice-dices">
      {character.DiceSim.dices.map((dice, index) =>
        <button key={index} className="dice-dice" onClick={handleRoll(dice.number, dice.value)}>{dice.number}D{dice.value}</button>
      )}
      </div>
      <form className="dice-form" onSubmit={onSubmit}>
        <input className="dice-input" type="nubmer" name="number" ref={register} autoComplete="false" required />
        <p className="dice-label">D</p>
        <input className="dice-input" type="nubmer" name="value" ref={register} autoComplete="false" required />
        <input className="dice-btn" type="submit" value="Add" />
      </form>
    </div>
  )
};

export default DiceSim;