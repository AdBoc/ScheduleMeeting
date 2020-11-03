import React from 'react';
import NumberInput from "../../../components/NumberInput/NumberInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import styles from "./equipment.module.scss";
import {changeCurrencyAmount} from "../../../redux/actions";

const Gold = () => {
  const currency = useSelector((state: RootState) => state.other.currency); //TODO: improve???
  const dispatch = useDispatch();
  console.log(currency.cP);
  return (
    <div className={styles.goldForm}>
      <NumberInput label="PP" value={currency.pP} dispatchAction={v => dispatch(changeCurrencyAmount("pP", parseInt(v)))}/>
      <NumberInput label="GP" value={currency.gP} dispatchAction={v => dispatch(changeCurrencyAmount("gP", parseInt(v)))}/>
      <NumberInput label="EP" value={currency.eP} dispatchAction={v => dispatch(changeCurrencyAmount("eP", parseInt(v)))}/>
      <NumberInput label="SP" value={currency.sP} dispatchAction={v => dispatch(changeCurrencyAmount("sP", parseInt(v)))}/>
      <NumberInput label="CP" value={currency.cP} dispatchAction={v => dispatch(changeCurrencyAmount("cP", parseInt(v)))}/>
    </div>
  );
}

export default Gold;