import React from 'react';
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {TextareaAutosize} from "react-autosize-textarea/lib/TextareaAutosize";
import {v4 as uuidv4} from 'uuid';
import styles from "./spells.module.scss";
import {addSpell} from "../../../../redux/actions";

interface IProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}

type Inputs = {
  name: string;
  level: string;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  description: string;
}

const AddSpell: React.FC<IProps> = ({handleClose}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit, errors} = useForm<Inputs>();
  const onSubmit = handleSubmit((data) => {
    dispatch(addSpell({...data, id: uuidv4()}));
    handleClose(prev => !prev);
  });

  return (
    <form className={styles.newSpellForm} onSubmit={onSubmit}>
      <p className={styles.formTitle}>Add Spell</p>
      <input
        ref={register({required: true, maxLength: 20})}
        className={errors.name ? styles.inputError : styles.inputField}
        name="name"
        placeholder="Name"
        autoComplete="off"
      />
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
      <select ref={register} className={styles.select} name="school" defaultValue="conjuration">
        <option value="conjuration">Conjuration</option>
        <option value="necromancy">Necromancy</option>
        <option value="evocation">Evocation</option>
        <option value="abjuration">Abjuration</option>
        <option value="transmutation">Transmutation</option>
        <option value="divination">Divination</option>
        <option value="enchantment">Enchantment</option>
        <option value="illusion">Illusion</option>
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
      <input
        ref={register({required: true, maxLength: 5})}
        className={errors.range ? styles.inputError : styles.inputField}
        name="range"
        placeholder="Range"
        type="number"
      />
      <TextareaAutosize
        ref={register({maxLength: 100})}
        className={errors.description ? styles.inputError : styles.inputField}
        name="description"
        placeholder="Description"
        rows={1}
      />
      <input className={styles.addSpell} type="submit" value="Submit"/>
    </form>
  )
}

export default AddSpell;