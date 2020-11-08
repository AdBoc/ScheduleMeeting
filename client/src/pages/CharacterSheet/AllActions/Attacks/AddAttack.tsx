import React, {Dispatch, SetStateAction} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import styles from "./attacks.module.scss";
import {addAttack} from "../../../../redux/actions";

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
    dispatch(addAttack(newElement));
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
      <select ref={register} className={styles.select} name="profMod" defaultValue="strength">
        <option value="strength">Strength</option>
        <option value="dexterity">Dexterity</option>
        <option value="constitution">Constitution</option>
        <option value="charisma">Charisma</option>
        <option value="intelligence">Intelligence</option>
        <option value="wisdom">Wisdom</option>
        <option value="">No Scaling</option>
      </select>
      <select ref={register} className={styles.select} name="type" defaultValue="slashing">
        <option value="slashing">Slashing</option>
        <option value="bludgeoning">Bludgeoning</option>
        <option value="piercing">Piercing</option>
        <option value="force">Force</option>
        <option value="fire">Fire</option>
        <option value="cold">Cold</option>
        <option value="lightning">Lightning</option>
        <option value="thunder">Thunder</option>
        <option value="poison">Poison</option>
        <option value="acid">Acid</option>
        <option value="psychic">Psychic</option>
        <option value="necrotic">Necrotic</option>
        <option value="radiant">Radiant</option>
      </select>
      <input className={styles.newAttackSubmit} type="submit" value="Submit"/>
    </form>
  );
}

export default AddAttack;