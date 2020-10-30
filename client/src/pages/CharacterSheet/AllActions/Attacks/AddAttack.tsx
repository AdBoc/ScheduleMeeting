import React, {Dispatch, SetStateAction} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addToArray} from "../../../../redux/actions";
import {v4 as uuidv4} from 'uuid';
import styles from "./attacks.module.scss";

interface IProps {
  handleClose: Dispatch<SetStateAction<boolean>>;
}

type Inputs = {
  name: string;
  diceType: string;
  range: string;
  bonusDamage: string;
  bonusHit: string;
  proficient: boolean;
  profMod: string;
  type: string;
}

const AddAttack: React.FC<IProps> = ({handleClose}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit, errors} = useForm<Inputs>();
  const onSubmit = handleSubmit((data) => {
    const newElement = {
      ...data,
      id: uuidv4(),
      range: parseInt(data.range),
      bonusDamage: parseInt(data.bonusDamage),
      bonusHit: parseInt(data.bonusHit)
    };
    dispatch(addToArray("Attacks", newElement));
    handleClose(prev => !prev);
  });

  return (
    <form className={styles.newAttackForm} onSubmit={onSubmit}>
      <p className={styles.formTitle}>New Attack</p>
      <input
        className={errors.name ? styles.inputError : styles.inputField}
        ref={register({required: true, maxLength: 20})}
        placeholder="Name"
        name="name"
        autoComplete="off"
        spellCheck="false"
      />
      <input
        className={errors.diceType ? styles.inputError : styles.inputField}
        ref={register({required: true, maxLength: 20})}
        placeholder="Dice"
        name="diceType"
        autoComplete="off"
        spellCheck="false"
      />
      <input
        className={errors.range ? styles.inputError : styles.inputField}
        ref={register({required: true, maxLength: 5})}
        placeholder="Range"
        name="range"
        type="number"
        autoComplete="off"
      />
      <input
        className={errors.bonusDamage ? styles.inputError : styles.inputField}
        ref={register({required: true, maxLength: 5})}
        placeholder="Bonus Damage"
        name="bonusDamage"
        autoComplete="off"
        type="number"
      />
      <input
        className={errors.bonusHit ? styles.inputError : styles.inputField}
        ref={register({required: true, maxLength: 5})}
        placeholder="Bonus hit"
        name="bonusHit"
        autoComplete="off"
        type="number"
      />
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
      <input className={styles.newAttackSubmit} type="submit" value="Submit"/>
    </form>
  );
}

export default AddAttack;