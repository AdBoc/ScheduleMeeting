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
  const handleChange = ({target}: any) => {
    if (/^[1-9][0-9]*$/.test(target.value))
      dispatch(editText(path, parseInt(target.value)));
  }

  return (
    <div className={styles.numberInput}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="number"
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
        value={value}
        autoComplete="off"
        autoCorrect="false"
        spellCheck="false"
      />
    </div>
  );
}

export default NumberInput;