import React, { useContext } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { characterContext } from '../../../context/Character';
import { useForm } from 'react-hook-form';
import { Types } from '../../../context/Character/reducer';
import { v4 as uuidv4 } from 'uuid';
import { Spell } from '../../../ts/interfaces';

interface IProps {
  handleClose: () => void
}

const AddSpell: React.FC<IProps> = ({ handleClose }) => {
  const { dispatch } = useContext(characterContext);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      school: "Conjuration",
    }
  });
  const onSubmit = handleSubmit((data) => {
    dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: "Spells", newValue: { ...data, id: uuidv4() } as Spell } });
    handleClose();
  });

  return (
    <form className="c-form" onSubmit={onSubmit}>
      <p className="c-form__label">Add Spell</p>
      <input ref={register} className="c-form__input" name="name" placeholder="Name" required />
      <select ref={register} className="c-form__input" name="level" required>
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
      <select ref={register} className="c-form__input" name="school">
        <option value="Conjuration">Conjuration</option>
        <option value="Necromancy">Necromancy</option>
        <option value="Evocation">Evocation</option>
        <option value="Abjuration">Abjuration</option>
        <option value="Transmutation">Transmutation</option>
        <option value="Divination">Divination</option>
        <option value="Enchantment">Enchantment</option>
        <option value="Illusion">Illusion</option>
      </select>
      <select ref={register} className="c-form__input" name="castingTime">
        <option value="1 action">1 action</option>
        <option value="bonus action">bonus action</option>
        <option value="1 minute">1 minute</option>
        <option value="10 minutes">10 minutes</option>
        <option value="1 hours">1 hours</option>
        <option value="8 hours">8 hours</option>
        <option value="12 hours">12 hours</option>
        <option value="24 hours">24 hours</option>
      </select>
      <input ref={register} className="c-form__input" name="range" placeholder="Range" type="number" required />
      <select ref={register} className="c-form__input" name="components" required>
        <option value="">--Components--</option>
        <option value="V">V</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="V, S">V, S</option>
        <option value="V, M">V, M</option>
        <option value="S, M">S, M</option>
        <option value="V, S, M">V, S, M</option>
      </select>
      <TextareaAutosize ref={register} className="c-form__input" name="description" placeholder="Description" rows={1} />
      <input className="g-btn" type="submit" value="Submit" />
    </form>
  )
};

export default AddSpell;
