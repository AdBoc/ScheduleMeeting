import React from 'react';
import NumberInput from "../../../components/NumberInput/NumberInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import styles from "./equipment.module.scss";

const Gold = () => {
  const currency = useSelector((state: RootState) => state.character.Other.Currency);
  return (
    <div className={styles.goldForm}>
      <NumberInput customClass={styles.numInput} label="PP" value={currency.PP} path="Other.Currency.PP"/>
      <NumberInput customClass={styles.numInput} label="GP" value={currency.GP} path="Other.Currency.GP"/>
      <NumberInput customClass={styles.numInput} label="EP" value={currency.EP} path="Other.Currency.EP"/>
      <NumberInput customClass={styles.numInput} label="SP" value={currency.SP} path="Other.Currency.SP"/>
      <NumberInput customClass={styles.numInput} label="CP" value={currency.CP} path="Other.Currency.CP"/>
    </div>
  );
}

export default Gold;