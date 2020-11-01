import React, {Dispatch, SetStateAction} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {v4 as uuidv4} from "uuid";
import {TextareaAutosize} from "react-autosize-textarea/lib/TextareaAutosize";
import styles from "./effects.module.scss";

interface IProps {
  handleClose: Dispatch<SetStateAction<boolean>>;
}

type Inputs = {
  name: string;
  description: string;
}

const AddEffect: React.FC<IProps> = ({handleClose}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit, errors} = useForm<Inputs>();
  const onSubmit = handleSubmit((data) => {
    const newElement = {
      ...data,
      id: uuidv4(),
    };
    // dispatch(addToArray("Effects", newElement));
    handleClose(prev => !prev);
  });

  return (
    <form className={styles.newEffectForm} onSubmit={onSubmit}>
      <p className={styles.formTitle}>New Effect</p>
      <input
        ref={register({required: true, maxLength: 20})}
        className={errors.name ? styles.inputError : styles.inputField}
        name="name"
        placeholder="Name"
        autoComplete="off"
        spellCheck="false"
      />
      <TextareaAutosize
        ref={register({maxLength: 100})}
        className={errors.description ? styles.inputError : styles.inputField}
        spellCheck="false"
        name="description"
        placeholder="Description"
        rows={1}
      />
      <input className={styles.newEffectSubmit} type="submit" value="Submit"/>
    </form>
  )
}

export default AddEffect;