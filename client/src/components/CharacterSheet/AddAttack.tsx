import React, { useState } from 'react';
import { Attack } from '../../ts/interfaces';

const AddAttack: React.FC = () => {
  const [newAttack, setNewAttack] = useState<Attack>({
    name: "",
    diceType: "",
    hitDc: "",
    range: "",
    type: ""
  });

  const submitNewAttack = (e: any) => {
    e.preventDefault();
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
      <button type="submit">Submit</button>
    </form>
  )
};

export default AddAttack;