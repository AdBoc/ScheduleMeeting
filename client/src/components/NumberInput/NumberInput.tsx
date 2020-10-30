import React from 'react';
import {useDispatch} from "react-redux";
import {editText} from "../../redux/actions";
import styles from "./NumberInput.module.scss";

interface IProps {
  label: string;
  value: number;
  path: string;
  customClass?: any;
}

const NumberInput: React.FC<IProps> = ({label, path, value, customClass}) => {
  const dispatch = useDispatch();
  const handleChange = ({target}: any) => {
    if (/^[1-9][0-9]*$/.test(target.value))
      dispatch(editText(path, parseInt(target.value)));
  }

  return (
    <div className={customClass ? customClass : styles.numberInput}>
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
        onInput = {(e: any) =>{
          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)
        }}
      />
    </div>
  );
}

export default NumberInput;