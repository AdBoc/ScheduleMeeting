import React, { useState, useContext } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
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
    hitDc: "",
    range: "",
    type: ""
  });

  const submitNewAttack = (e: any) => {
    e.preventDefault();
    let attackData: any = { ...newAttack };
    attackData.id = uuidv4();
    dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: "Attacks", newValue: attackData } });
    setRenderForm(prev => !prev);
  };

  const handleInput = ({ target }: any) => {
    if (target.value.length > 20)
      return;
    const { name, value } = target;
    setNewAttack({ ...newAttack, [name]: value });
  };

  return (
    <form className="c-new-atk" onSubmit={submitNewAttack}>
      <input className="c-new-atk__input" placeholder="name" onChange={handleInput} name="name" value={newAttack.name} required />
      <input className="c-new-atk__input" placeholder="abilityMod" onChange={handleInput} name="abilityMod" value={newAttack.abilityMod} required />
      <input className="c-new-atk__input" placeholder="dice" onChange={handleInput} name="diceType" value={newAttack.diceType} required />
      <input className="c-new-atk__input" placeholder="HitDC" onChange={handleInput} name="hitDc" value={newAttack.hitDc} />
      <input className="c-new-atk__input" placeholder="range" onChange={handleInput} name="range" value={newAttack.range} />
      <input className="c-new-atk__input" placeholder="type" onChange={handleInput} name="type" value={newAttack.type} />
      <button className="c-new-atk__submit g-btn" type="submit">Submit</button>
    </form>
  )
};

export default AddAttack;