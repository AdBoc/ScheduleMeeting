import React, { useContext, useState } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import { v4 as uuidv4 } from 'uuid';
import { BackpackObj } from '../../ts/interfaces';

interface IProps {
  setRenderForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddEquipment: React.FC<IProps> = ({ setRenderForm }) => {
  const { dispatch } = useContext(characterContext);
  const [item, setItem] = useState({
    name: "",
    description: ""
  });

  const submitNewEq = (e: any) => {
    e.preventDefault();
    let newItem: any = { ...item };
    newItem.id = uuidv4();
    dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: "Equipment", newValue: newItem as BackpackObj } });
    setRenderForm(prev => !prev);
  };

  const handleInput = ({ target }: any) => {
    if (target.value.length > 20)
      return;
    const { name, value } = target;
    setItem({ ...item, [name]: value });
  };

  return (
    <form className="c-new-eq" onSubmit={submitNewEq}>
      <input className="c-new-eq__input" placeholder="name" onChange={handleInput} name="name" value={item.name} maxLength={20} aria-label="item name" required />
      <input className="c-new-eq__input" placeholder="description" onChange={handleInput} name="description" value={item.description} aria-label="description" maxLength={30} required />
      <button className="g-btn" type="submit">Submit</button>
    </form>
  )
};

export default AddEquipment;