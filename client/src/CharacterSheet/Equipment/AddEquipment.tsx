import React, { useContext, useState } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import { v4 as uuidv4 } from 'uuid';
import { BackpackObj } from '../../ts/interfaces';
import './styles.scss';

interface IProps {
  setRenderForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddEquipment: React.FC<IProps> = ({ setRenderForm }) => {
  const { dispatch } = useContext(characterContext);
  const [item, setItem] = useState({
    name: "",
    description: "",
    quantity: 0,
    weight: 0,
    type: "other"
  });

  const submitNewEq = (e: any) => {
    e.preventDefault();
    let newItem: BackpackObj = { ...item, id: uuidv4() };
    dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: "Equipment", newValue: newItem } });
    setRenderForm(prev => !prev);
  };

  const handleInput = ({ target }: any) => {
    if (target.value.length > 20)
      return;
    const { name, value } = target;
    setItem({ ...item, [name]: value });
  };

  const handleSelect = ({ target }: any) => setItem({ ...item, type: target.value });

  return (
    <form className="c-new-eq" onSubmit={submitNewEq}>
      <input className="c-new-eq__input" placeholder="name" onChange={handleInput} name="name" value={item.name} maxLength={20} aria-label="item name" autoComplete="off" required />
      <input className="c-new-eq__input" placeholder="description" onChange={handleInput} name="description" value={item.description} aria-label="description" autoComplete="off" maxLength={30} />
      <div className="c-new-eq-flex">
        <label className="c-new-eq__label" htmlFor="quantity">Quantity:</label>
        <input className="c-new-eq__num" type="number" placeholder="quantity" onChange={handleInput} name="quantity" value={item.quantity} aria-label="quantity" onFocus={(e: any) => e.target.select()} />
      </div>
      <div className="c-new-eq-flex">
        <label className="c-new-eq__label" htmlFor="weight">Weight:</label>
        <input className="c-new-eq__num" type="number" placeholder="weight" onChange={handleInput} name="weight" value={item.weight} aria-label="quantity" onFocus={(e: any) => e.target.select()} />
      </div>
      <select className="c-new-eq__input" onChange={handleSelect}>
        <option value="other">Other</option>
        <option value="armors">Armors</option>
        <option value="attunement">Attunement</option>
        <option value="weapons">Weapons</option>
        <option value="potions">Potions</option>
        <option value="food">Food</option>
        <option value="rings">Rings</option>
      </select>
      <button className="g-btn" type="submit">Submit</button>
    </form>
  )
};

export default AddEquipment;