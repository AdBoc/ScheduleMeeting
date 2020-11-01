import React from 'react';
import {useDispatch} from "react-redux";
import styles from "./checkbox.module.scss";

interface IProps {
  label: string;
  path: string;
  checkboxValue: boolean;
}

const Checkbox: React.FC<IProps> = ({label, path, checkboxValue}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.checkboxLabel} htmlFor="inspiration">{label}</label>
      <input
        className={styles.checkbox}
        id="inspiration"
        type="checkbox"
        checked={checkboxValue}
        onChange={() => {
          // dispatch(flipBool(path));
        }}
      />
    </div>
  );
}

export default Checkbox;