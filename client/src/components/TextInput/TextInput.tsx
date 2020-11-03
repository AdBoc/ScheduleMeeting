import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./textInput.module.scss";
import {RootState} from "../../redux/reducers";
import {Background} from "../../redux/types";
import {changeBackground} from "../../redux/actions";

interface IProps {
  label: string;
  backgroundProp: keyof Background;
}

const TextInput: React.FC<IProps> = ({label, backgroundProp}) => {
  const value = useSelector((stat: RootState) => stat.background[backgroundProp]);
  const dispatch = useDispatch();

  return (
    <div className={styles.textInput}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="text"
        onChange={({target}) => {dispatch(changeBackground(backgroundProp, target.value))}}
        value={value}
        autoComplete="off"
        autoCorrect="false"
        spellCheck="false"
        maxLength={22}
      />
    </div>
  );
}

export default TextInput;