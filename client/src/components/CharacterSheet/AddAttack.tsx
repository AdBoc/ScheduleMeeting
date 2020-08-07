import React, { useState, useContext } from 'react';
import { Attack } from '../../ts/interfaces';
import { characterContext } from '../../context/character';
import { Types } from '../../context/sheetReducer';

const AddAttack: React.FC = () => {

  const { dispatch } = useContext(characterContext);
  const [newAttack, setNewAttack] = useState<Attack>({
    name: "",
    diceType: "",
    hitDc: "",
    range: "",
    type: ""
  });

  const submitNewAttack = (e: any) => {
    e.preventDefault();
    dispatch({ type: Types.ADD_ATTACK, payload: { attackData: newAttack } });
  };

  const handleInput = ({ target }: any) => {
    const { name, value } = target;
    setNewAttack({ ...newAttack, [name]: value });
  };

  return (
    <form onSubmit={submitNewAttack}>
      <input placeholder="name" onChange={handleInput} name="name" value={newAttack.name} />
      <input placeholder="dice" onChange={handleInput} name="diceType" value={newAttack.diceType} />
      <input placeholder="HitDC" onChange={handleInput} name="hitDc" value={newAttack.hitDc} />
      <input placeholder="range" onChange={handleInput} name="range" value={newAttack.range} />
      <input placeholder="type" onChange={handleInput} name="type" value={newAttack.type} />
      <button className="g-btn" type="submit">Submit</button>
    </form>
  )
};

export default AddAttack;