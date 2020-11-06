import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./checkbox.module.scss";
import {RootState} from "../../redux/reducers";
import {changeStatus} from "../../redux/actions";

interface IProps {
  label: string;
  propertyName: "inspiration";
}

const Checkbox: React.FC<IProps> = ({label, propertyName}) => {
  const checkboxStatus = useSelector((state: RootState) => state.other[propertyName]);
  const dispatch = useDispatch();
  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.checkboxLabel} htmlFor="reactCheckbox">{label}</label>
      <input
        className={styles.checkbox}
        id="reactCheckbox"
        type="checkbox"
        checked={checkboxStatus}
        onChange={() => {
          dispatch(changeStatus(propertyName))
        }}
      />
    </div>
  );
}

export default Checkbox;