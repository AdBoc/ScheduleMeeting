import React, { useContext } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
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
    <form className="form-effect" onSubmit={onSubmit}>
      <p className="form-effect__label">New Effect</p>
      <input className="form-effect__input" name="name" placeholder="Name" ref={register} />
      <TextareaAutosize ref={register} className="form-effect__input" name="description" placeholder="Description" rows={1} />
      <input className="effect-btn" type="submit" value="Submit" />
    </form>
  )
};

export default AddEffect;
