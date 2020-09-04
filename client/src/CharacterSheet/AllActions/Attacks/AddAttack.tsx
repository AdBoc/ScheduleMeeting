import React, { useContext } from 'react';
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { Attack } from '../../../ts/interfaces';

interface IProps {
  handleClose: () => void
}

const AddAttack: React.FC<IProps> = ({ handleClose }) => {
  const { dispatch } = useContext(characterContext);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      type: "Slashing",
      profMod: "Strength"
    }
  });
  const onSubmit = handleSubmit((data) => {
    dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: 'Attacks', newValue: { ...data, id: uuidv4() } as Attack } });
    handleClose();
  });

  return (
    <form className="form-atk" onSubmit={onSubmit}>
      <p className="form-atk__label">New Attack</p>
      <input className="form-atk__input" ref={register} placeholder="Name" name="name" autoComplete="off" required />
      <input className="form-atk__input" ref={register} placeholder="Dice" name="diceType" autoComplete="off" required />
      <input className="form-atk__input" ref={register} placeholder="Range" name="range" type="number" autoComplete="off" required />
      <input className="form-atk__input" ref={register} placeholder="Bonus Damage" name="bonusDamage" autoComplete="off" type="number" required />
      <input className="form-atk__input" ref={register} placeholder="Bonus hit" name="bonusHit" autoComplete="off" type="number" required />
      <label className="form-atk__box-label">Proficiency<input ref={register} className="form-atk__checkbox" type="checkbox" name="proficient" /></label>
      <select className="form-atk__input" ref={register} name="profMod">
        <option value="Strength">Strength</option>
        <option value="Dexterity">Dexterity</option>
        <option value="Constitution">Constitution</option>
        <option value="Charisma">Charisma</option>
        <option value="Intelligence">Intelligence</option>
        <option value="Wisdom">Wisdom</option>
      </select>
      <select className="form-atk__input" ref={register} name="type">
        <option value="Slashing">Slashing</option>
        <option value="Bluegoing">Bluegoing</option>
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
      <input className="atk-btn" type="submit" value="Submit" />
    </form>
  )
};

export default AddAttack;
