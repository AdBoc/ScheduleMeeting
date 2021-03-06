import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useForm} from 'react-hook-form';
import TextareaAutosize from 'react-autosize-textarea';
import {useDispatch} from "react-redux";
import styles from "./equipment.module.scss";
import {addItem} from "../../../redux/actions";

type Props = {
  closeForm: React.Dispatch<React.SetStateAction<boolean>>
}

type Inputs = {
  name: string;
  description: string;
  quantity: string;
  type: string;
}

const AddItem: React.FC<Props> = ({closeForm}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm<Inputs>();
  const onSubmit = handleSubmit((data) => {
    dispatch(addItem({...data, quantity: parseInt(data.quantity), id: uuidv4()}));
    closeForm(prev => !prev);
  });

  return (
    <form className={styles.addItemForm} onSubmit={onSubmit}>
      <input ref={register({required: true})} className={styles.addItemInput} placeholder="Name" name="name" aria-label="item name" autoComplete="off"/>
      <input ref={register} className={styles.addItemInput} type="number" name="quantity" aria-label="quantity" placeholder="Quantity" onFocus={(e: any) => e.target.select()}/>
      <select ref={register} className={styles.addItemSelect} name="type" defaultValue="other">
        <option value="other">Other</option>
        <option value="weapons">Weapons</option>
        <option value="armors">Armors</option>
        <option value="potions">Potions</option>
        <option value="magic">Magic Items</option>
        <option value="tools">Tools</option>
      </select>
      <TextareaAutosize ref={register} className={styles.addItemInput} name="description" placeholder="Description" rows={1}/>
      <input className={styles.submit} type="submit" value="Submit"/>
    </form>
  )
};

export default AddItem;