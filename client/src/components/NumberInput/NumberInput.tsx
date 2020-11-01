import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./NumberInput.module.scss";
import {changeCharacterStat} from "../../redux/actions";
import {CharacterStats} from "../../redux/types";
import {RootState} from "../../redux/reducers";

interface IProps {
  label: string;
  statName: keyof CharacterStats;
  customClass?: any;
}

const NumberInput: React.FC<IProps> = ({label, statName, customClass}) => {
  const inputValue = useSelector((state: RootState) => state.characterStats[statName]);
  const dispatch = useDispatch();

  return (
    <div className={customClass ? customClass : styles.numberInput}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="number"
        onChange={(e) => {dispatch(changeCharacterStat(statName, parseInt(e.target.value)))}}
        onFocus={(e) => e.target.select()}
        value={inputValue}
        autoComplete="off"
        autoCorrect="false"
        spellCheck="false"
        onInput = {(e: any) => {e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)}}
      />
    </div>
  );
}

export default NumberInput;