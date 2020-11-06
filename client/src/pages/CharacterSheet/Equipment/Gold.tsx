import React from 'react';
import NumberInput from "../../../components/NumberInput/NumberInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import styles from "./equipment.module.scss";
import {changeCurrencyAmount} from "../../../redux/actions";

const Gold = () => {
  const currency = useSelector((state: RootState) => state.other.currency);
  const dispatch = useDispatch();
  return (
    <div className={styles.goldForm}>
      <NumberInput customLabelClass={styles.customGoldLabel} label="PP" value={currency.pP} dispatchAction={v => dispatch(changeCurrencyAmount("pP", parseInt(v)))}/>
      <NumberInput customLabelClass={styles.customGoldLabel} label="GP" value={currency.gP} dispatchAction={v => dispatch(changeCurrencyAmount("gP", parseInt(v)))}/>
      <NumberInput customLabelClass={styles.customGoldLabel} label="EP" value={currency.eP} dispatchAction={v => dispatch(changeCurrencyAmount("eP", parseInt(v)))}/>
      <NumberInput customLabelClass={styles.customGoldLabel} label="SP" value={currency.sP} dispatchAction={v => dispatch(changeCurrencyAmount("sP", parseInt(v)))}/>
      <NumberInput customLabelClass={styles.customGoldLabel} label="CP" value={currency.cP} dispatchAction={v => dispatch(changeCurrencyAmount("cP", parseInt(v)))}/>
    </div>
  );
}

export default Gold;