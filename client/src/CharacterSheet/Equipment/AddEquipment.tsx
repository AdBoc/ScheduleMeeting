import React, { useContext } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import { v4 as uuidv4 } from 'uuid';
import { BackpackObj } from '../../ts/interfaces';
import './styles.scss';
import { useForm } from 'react-hook-form';

interface IProps {
  setRenderForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddEquipment: React.FC<IProps> = ({ setRenderForm }) => {
  const { dispatch } = useContext(characterContext);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      type: "other"
    }
  });
  const onSubmit = handleSubmit((data) => {
    dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: "Equipment", newValue: { ...data, id: uuidv4() } as BackpackObj } });
    setRenderForm(prev => !prev);
  });

  return (
    <form className="c-new-eq" onSubmit={onSubmit}>
      <input className="c-new-eq__input" ref={register} placeholder="name" name="name" aria-label="item name" autoComplete="off" required />
      <input className="c-new-eq__input" ref={register} placeholder="description" name="description" aria-label="description" autoComplete="off" />
      <div className="c-new-eq-flex">
        <label className="c-new-eq__label" htmlFor="quantity">Quantity:</label>
        <input className="c-new-eq__num" ref={register} type="number" name="quantity" aria-label="quantity" onFocus={(e: any) => e.target.select()} />
      </div>
      <select className="c-new-eq__input" name="type" ref={register}>
        <option value="other">Other</option>
        <option value="weapons">Weapons</option>
        <option value="armors">Armors</option>
        <option value="potions">Potions</option>
        <option value="magic">Magic Items</option>
        <option value="tools">Tools</option>
      </select>
      <input className="eq-btn" type="submit" value="Submit" />
    </form>
  )
};

export default AddEquipment;