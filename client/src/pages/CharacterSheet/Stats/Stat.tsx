import React, {useRef, useState} from 'react';
import {dndMath} from "../../../utils/dndMath";
import {useDispatch, useSelector} from "react-redux";

import {changeStatValue} from "../../../redux/actions";
import {RootState} from "../../../redux/reducers";

import styles from "./stats.module.scss";
import {hpColors} from "../../statsColors";

type Props = {
  statName: keyof RootState["stats"];
}

const Stat: React.FC<Props> = ({statName}) => {
  const statValue = useSelector((state: RootState) => state.stats[statName]);
  const dispatch = useDispatch();

  const [newValue, setNewValue] = useState(statValue);
  const error = useRef(false);

  const statMod = dndMath.statModifier(statValue);

  const handleStatChange = ({target}: any) => {
    setNewValue(target.value);
    if (/^\b([1-9]|[12][0-9]|30)\b/.test(target.value)) {
      error.current = false;
      dispatch(changeStatValue(statName, +target.value));
    } else {
      error.current = true;
    }
  }

  return (
    <div className={styles.stat}>
      <input className={styles.statInput} type="number" value={newValue} onChange={handleStatChange} onFocus={(e) => e.target.select()}/>
      {error.current && <p className={styles.inputError}>Value should between 0-30</p>}
      <p className={styles.statName}>{statName}</p>
      <p className={styles.statMod}>MOD</p>
      <p className={`${styles.statModVal} ${hpColors[statMod]}`}>{statMod}</p>
    </div>
  );
}

export default Stat;