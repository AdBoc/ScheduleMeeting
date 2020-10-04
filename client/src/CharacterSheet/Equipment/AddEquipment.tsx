import React, {useContext} from 'react';

import {characterContext} from '../../context/Character';
import {v4 as uuidv4} from 'uuid';
import {useForm} from 'react-hook-form';

import TextareaAutosize from 'react-autosize-textarea';

import {BackpackObj} from '../../ts/interfaces';
import {Types} from '../../context/Character/reducer';

import './styles.scss';

interface IProps {
  setRenderForm: React.Dispatch<React.SetStateAction<boolean>>;
  nodeRef: React.MutableRefObject<any>;
}

const AddEquipment: React.FC<IProps> = ({setRenderForm, nodeRef}) => {
  const {dispatch} = useContext(characterContext);
  const {register, handleSubmit} = useForm({
    defaultValues: {
      type: "other"
    }
  });
  const onSubmit = handleSubmit((data) => {
    dispatch({type: Types.ADD_TO_ARRAY, payload: {property: "Equipment", newValue: {...data, id: uuidv4()} as BackpackObj}});
    setRenderForm(prev => !prev);
  });

  return (
    <form className="c-new-eq" onSubmit={onSubmit} ref={nodeRef}>
      <input className="c-new-eq__input" ref={register} placeholder="Name" name="name" aria-label="item name" autoComplete="off" required/>
      <TextareaAutosize ref={register} className="c-new-eq__input" name="description" placeholder="Description" rows={1}/>
      <div className="c-new-eq-flex">
        <label className="c-new-eq__label" htmlFor="quantity">Quantity:</label>
        <input className="c-new-eq__num" ref={register} type="number" name="quantity" aria-label="quantity" onFocus={(e: any) => e.target.select()}/>
      </div>
      <select className="c-new-eq__input" name="type" ref={register}>
        <option value="other">Other</option>
        <option value="weapons">Weapons</option>
        <option value="armors">Armors</option>
        <option value="potions">Potions</option>
        <option value="magic">Magic Items</option>
        <option value="tools">Tools</option>
      </select>
      <input className="eq-btn" type="submit" value="Submit"/>
    </form>
  )
};

export default AddEquipment;
