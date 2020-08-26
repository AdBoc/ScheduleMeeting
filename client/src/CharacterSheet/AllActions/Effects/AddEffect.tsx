import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';
import { v4 as uuidv4 } from 'uuid';
import { Effect } from '../../../ts/interfaces';

interface IProps {
  handleClose: () => void
}

const AddEffect: React.FC<IProps> = ({ handleClose }) => {
  const { dispatch } = useContext(characterContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: "Effects", newValue: { ...data, id: uuidv4(), active: false } as Effect } })
    handleClose();
  });

  return (
    <form className="c-form" onSubmit={onSubmit}>
      <p className="c-form__label">New Effect</p>
      <input className="c-form__input" name="name" placeholder="name" ref={register} />
      <input className="c-form__input" name="description" placeholder="description" ref={register} />
      <input className="g-btn" type="submit" value="Submit" />
    </form>
  )
};

export default AddEffect;
