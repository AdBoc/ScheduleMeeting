import React from 'react';
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {addToArray} from "../../../../redux/actions";
import {TextareaAutosize} from "react-autosize-textarea/lib/TextareaAutosize";
import {v4 as uuidv4} from 'uuid';
import styles from "./spells.module.scss";

interface IProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}

const AddSpell: React.FC<IProps> = ({handleClose}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const onSubmit = handleSubmit((data) => {
    dispatch(addToArray("Spells", {...data, id: uuidv4()}));
    handleClose(prev => !prev);
  });

  return (
    <form className={styles.newSpellForm} onSubmit={onSubmit}>
      <p>Add Spell</p>
      <input ref={register({required: true})} className={styles.inputField} name="name" placeholder="Name" autoComplete="off"/>
      <select ref={register({required: true})} className={styles.select} name="level">
        <option value="">--Spell Level--</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="cantrip">cantrip</option>
      </select>
      <select ref={register} className={styles.select} name="school" defaultValue="Conjuration">
        <option value="Conjuration">Conjuration</option>
        <option value="Necromancy">Necromancy</option>
        <option value="Evocation">Evocation</option>
        <option value="Abjuration">Abjuration</option>
        <option value="Transmutation">Transmutation</option>
        <option value="Divination">Divination</option>
        <option value="Enchantment">Enchantment</option>
        <option value="Illusion">Illusion</option>
      </select>
      <select ref={register} className={styles.select} name="castingTime">
        <option value="1 action">1 action</option>
        <option value="bonus action">bonus action</option>
        <option value="1 minute">1 minute</option>
        <option value="10 minutes">10 minutes</option>
        <option value="1 hours">1 hours</option>
        <option value="8 hours">8 hours</option>
        <option value="12 hours">12 hours</option>
        <option value="24 hours">24 hours</option>
      </select>
      <input ref={register({required: true})} className={styles.inputField} name="range" placeholder="Range" type="number"/>
      <select ref={register} className={styles.select} name="components" required>
        <option value="">--Components--</option>
        <option value="V">V</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="V, S">V, S</option>
        <option value="V, M">V, M</option>
        <option value="S, M">S, M</option>
        <option value="V, S, M">V, S, M</option>
      </select>
      <TextareaAutosize ref={register} className={styles.inputField} name="description" placeholder="Description" rows={1}/>
      <input type="submit" value="Submit"/>
    </form>
  )
}

export default AddSpell;