import React from 'react';
import {useDispatch} from "react-redux";
import styles from "./modifyStatField.module.scss";

interface IProps {
  label: string;
  path: string;
  value: number;
}

const ModifyStatField: React.FC<IProps> = ({label, path, value}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.modifyFieldWrapper}>
      <p>{label}</p>
      <div>
        <button
          className={styles.modifyIcon}
          onClick={() => {
            // dispatch(decrementStat(path))
          }}>-
        </button>
        <p className={styles.value}>{value}</p>
        <button
          className={styles.modifyIcon}
          onClick={() => {
            // dispatch(incrementStat(path))
          }}>+
        </button>
      </div>
    </div>
  );
}

export default ModifyStatField;