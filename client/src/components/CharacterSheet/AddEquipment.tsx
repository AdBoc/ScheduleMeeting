import React, { useContext, useState } from 'react';
import { characterContext } from '../../context/character';
import { BackpackObj } from '../../ts/interfaces';
import { Types } from '../../context/sheetReducer';

const AddEquipment = () => {
  const { dispatch } = useContext(characterContext);
  const [newItem, setNewItem] = useState<BackpackObj>({
    name: "",
    description: ""
  });

  const submitNewEq = (e: any) => {
    e.preventDefault();
    dispatch({ type: Types.ADD_EQUIPMENT, payload: { newItem } })
  };

  const handleInput = ({ target }: any) => {
    const { name, value } = target;
    setNewItem({ ...newItem, [name]: value });
  };

  return (
    <form onSubmit={submitNewEq}>
      <input placeholder="name" onChange={handleInput} name="name" value={newItem.name} />
      <input placeholder="description" onChange={handleInput} name="description" value={newItem.description} />
      <button type="submit">Submit</button>
    </form>
  )
};

export default AddEquipment;