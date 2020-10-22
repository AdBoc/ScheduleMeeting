import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useForm} from 'react-hook-form';
import TextareaAutosize from 'react-autosize-textarea';
import {useDispatch} from "react-redux";
import {addToArray} from "../../../redux/actions";

interface IProps {
  closeForm: () => void;
}

const AddItem: React.FC<IProps> = ({closeForm}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const onSubmit = handleSubmit((data) => {
    dispatch(addToArray("Equipment", {...data, id: uuidv4()}));
    closeForm();
  });

  return (
    <form onSubmit={onSubmit}>
      <input ref={register} placeholder="Name" name="name" aria-label="item name" autoComplete="off" required/>
      <TextareaAutosize ref={register} name="description" placeholder="Description" rows={1}/>
      <>
        <label htmlFor="quantity">Quantity:</label>
        <input ref={register} type="number" name="quantity" aria-label="quantity" onFocus={(e: any) => e.target.select()}/>
      </>
      <select name="type" ref={register} defaultValue="other">
        <option value="other">Other</option>
        <option value="weapons">Weapons</option>
        <option value="armors">Armors</option>
        <option value="potions">Potions</option>
        <option value="magic">Magic Items</option>
        <option value="tools">Tools</option>
      </select>
      <input type="submit" value="Submit"/>
    </form>
  )
};

export default AddItem;