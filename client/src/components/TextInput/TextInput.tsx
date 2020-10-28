import React from 'react';
import {useDispatch} from "react-redux";
import {editText} from "../../redux/actions";
import styles from "./textInput.module.scss";

interface IProps {
  label: string;
  value: string;
  path: string;
}

const TextInput: React.FC<IProps> = ({label, path, value}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.textInput}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="text"
        onChange={({target}) => {
          dispatch(editText(path, target.value))
        }}
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