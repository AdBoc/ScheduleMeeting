import React, { useState, useContext } from 'react';
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  setRenderForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddAttack: React.FC<IProps> = ({ setRenderForm }) => {
  const { dispatch } = useContext(characterContext);
  const [newAttack, setNewAttack] = useState({
    name: "",
    abilityMod: "",
    diceType: "",
    baseDmg: "",
    range: "",
    type: "Slashing"
  });

  const submitNewAttack = (e: any) => {
    e.preventDefault();
    dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: "Attacks", newValue: { ...newAttack, id: uuidv4() } } });
    setRenderForm(prev => !prev);
  };

  const handleInput = ({ target }: any) => {
    if (target.value.length > 20) return;
    const { name, value } = target;
    setNewAttack({ ...newAttack, [name]: value });
  };

  const handleSelect = ({ target }: any) => setNewAttack({ ...newAttack, type: target.value });

  return (
    <form className="c-form" onSubmit={submitNewAttack}>
      <input className="c-form__input" placeholder="Name" onChange={handleInput} name="name" value={newAttack.name} autoComplete="off" required />
      <input className="c-form__input" type="number" placeholder="Modifier" onChange={handleInput} name="abilityMod" value={newAttack.abilityMod} autoComplete="off" required />
      <input className="c-form__input" placeholder="Dice" onChange={handleInput} name="diceType" value={newAttack.diceType} autoComplete="off" required />
      <input className="c-form__input" type="number" placeholder="Base Dmg" onChange={handleInput} name="baseDmg" value={newAttack.baseDmg} autoComplete="off" required />
      <input className="c-form__input" type="number" placeholder="Range" onChange={handleInput} name="range" value={newAttack.range} autoComplete="off" />
      <select className="c-form__input" onChange={handleSelect}>
        <option value="Slashing">Slashing</option>
        <option value="Bluegoing">Bluegoing</option>
        <option value="Piercing">Piercing</option>
        <option value="Force">Force</option>
        <option value="Fire">Fire</option>
        <option value="Cold">Cold</option>
        <option value="Lightning">Lightning</option>
        <option value="Thunder">Thunder</option>
        <option value="Poison">Poison</option>
        <option value="Acid">Acid</option>
        <option value="Psychic">Psychic</option>
        <option value="Necrotic">Necrotic</option>
        <option value="Radiant">Radiant</option>
      </select>
      <button className="g-btn" type="submit">Submit</button>
    </form>
  )
};

export default AddAttack;