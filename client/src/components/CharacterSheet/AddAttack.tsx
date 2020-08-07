import React, { useState, useContext } from 'react';
import { characterContext } from '../../context/character';
import { Types } from '../../context/sheetReducer';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  formVisibility: () => void;
}

const AddAttack: React.FC<IProps> = ({ formVisibility }) => {

  const { dispatch } = useContext(characterContext);
  const [newAttack, setNewAttack] = useState({
    name: "",
    diceType: "",
    hitDc: "",
    range: "",
    type: ""
  });

  const submitNewAttack = (e: any) => {
    e.preventDefault();
    let attackData: any = { ...newAttack };
    attackData.id = uuidv4();
    dispatch({ type: Types.ADD_ATTACK, payload: { attackData } });
    formVisibility();
  };

  const handleInput = ({ target }: any) => {
    const { name, value } = target;
    setNewAttack({ ...newAttack, [name]: value });
  };

  return (
    <form className="c-new-atk" onSubmit={submitNewAttack}>
      <input className="c-new-atk__input" placeholder="name" onChange={handleInput} name="name" value={newAttack.name} />
      <input className="c-new-atk__input" placeholder="dice" onChange={handleInput} name="diceType" value={newAttack.diceType} />
      <input className="c-new-atk__input" placeholder="HitDC" onChange={handleInput} name="hitDc" value={newAttack.hitDc} />
      <input className="c-new-atk__input" placeholder="range" onChange={handleInput} name="range" value={newAttack.range} />
      <input className="c-new-atk__input" placeholder="type" onChange={handleInput} name="type" value={newAttack.type} />
      <button className="c-new-atk__submit g-btn" type="submit">Submit</button>
    </form>
  )
};

export default AddAttack;