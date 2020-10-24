import React from 'react';
import {useDispatch} from "react-redux";
import {editText} from "../../redux/actions";
import styles from "./NumberInput.module.scss";

interface IProps {
  label: string;
  value: number;
  path: string;
}

const NumberInput: React.FC<IProps> = ({label, path, value}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.numberInput}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="number"
        onChange={({target}) => dispatch(editText(path, parseInt(target.value)))}
        value={value}
        autoComplete="off"
        autoCorrect="false"
        spellCheck="false"
      />
    </div>
  );
}

export default NumberInput;