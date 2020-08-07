import React, { useContext, useState } from 'react';
import { characterContext } from '../../context/character';
import { Types } from '../../context/sheetReducer';
import { v4 as uuidv4 } from 'uuid';

const AddEquipment = () => {
  const { dispatch } = useContext(characterContext);
  const [item, setItem] = useState({
    name: "",
    description: ""
  });

  const submitNewEq = (e: any) => {
    e.preventDefault();
    let newItem: any = { ...item };
    newItem.id = uuidv4();
    dispatch({ type: Types.ADD_EQUIPMENT, payload: { newItem } })
  };

  const handleInput = ({ target }: any) => {
    const { name, value } = target;
    setItem({ ...item, [name]: value });
  };

  return (
    <form onSubmit={submitNewEq}>
      <input placeholder="name" onChange={handleInput} name="name" value={item.name} maxLength={20} aria-label="item name" required />
      <input placeholder="description" onChange={handleInput} name="description" value={item.description} aria-label="description" maxLength={30} required />
      <button className="g-btn" type="submit">Submit</button>
    </form>
  )
};

export default AddEquipment;