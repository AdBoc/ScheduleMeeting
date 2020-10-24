import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addToArray} from "../../../../redux/actions";
import {v4 as uuidv4} from 'uuid';
import styles from "./attacks.module.scss";

interface IProps {
  handleClose: () => void;
}

const AddAttack: React.FC<IProps> = ({handleClose}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const onSubmit = handleSubmit((data) => {
    const newElement = {
      ...data,
      id: uuidv4(),
      range: parseInt(data.range),
      bonusDamage: parseInt(data.bonusDamage),
      bonusHit: parseInt(data.bonusHit)
    };
    dispatch(addToArray("Attacks", newElement));
    handleClose();
  });

  return (
    <form className={styles.newAttackForm} onSubmit={onSubmit}>
      <input className={styles.inputField} ref={register({required: true})} placeholder="Name" name="name" autoComplete="off"/>
      <input className={styles.inputField} ref={register({required: true})} placeholder="Dice" name="diceType" autoComplete="off"/>
      <input className={styles.inputField} ref={register({required: true})} placeholder="Range" name="range" type="number" autoComplete="off"/>
      <input className={styles.inputField} ref={register({required: true})} placeholder="Bonus Damage" name="bonusDamage" autoComplete="off" type="number"/>
      <input className={styles.inputField} ref={register({required: true})} placeholder="Bonus hit" name="bonusHit" autoComplete="off" type="number"/>
      <label>Proficiency<input ref={register} className={styles.profCheckbox} type="checkbox" name="proficient"/></label>
      <select ref={register} className={styles.select} name="profMod" defaultValue="Strength">
        <option value="Strength">Strength</option>
        <option value="Dexterity">Dexterity</option>
        <option value="Constitution">Constitution</option>
        <option value="Charisma">Charisma</option>
        <option value="Intelligence">Intelligence</option>
        <option value="Wisdom">Wisdom</option>
        <option value="">No Scaling</option>
      </select>
      <select ref={register} className={styles.select} name="type" defaultValue="Slashing">
        <option value="Slashing">Slashing</option>
        <option value="Bludgeoning">Bludgeoning</option>
        <option value="Piercing">Piercing</option>
        <option value="Force">Force</option>
        <option value="Fire">Fire</option>
        <option value="Cold">Cold</option>
        <option value="Lightning">Lightning</option>
        <option value="Thunder">Thunder</option>
        <option value="Poison">Poison</option>
        <option value="Acid">Acid</option>
        <option value="Psychic">Psychic</option>
        <option value="Necrotic">Necrotic</option>
        <option value="Radiant">Radiant</option>
      </select>
      <input type="submit" value="Submit"/>
    </form>
  );
}

export default AddAttack;