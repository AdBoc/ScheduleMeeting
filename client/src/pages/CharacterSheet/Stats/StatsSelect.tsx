import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeStatValue, setCharacter} from "../../../redux/actions";
import styles from "./stats.module.scss";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";

interface IProps {
  statName: string;
  statVal: number;
}

const StatsSelect: React.FC<IProps> = ({statName, statVal}) => {
  const character = useSelector((state: RootState) => state.character);
  const dispatch = useDispatch();
  const [newVal, setNewVal] = useState(statVal);
  const error = useRef(false);

  const handleStatChange = ({target}: any) => {
    setNewVal(target.value);
    if (/^\b([1-9]|[12][0-9]|30)\b/.test(target.value)) {
      error.current = false;
      dispatch(setCharacter({...character, Skills: dndMath.generateNewSkills(character.Skills, +target.value, statName)}));
      dispatch(changeStatValue(`Stats.${statName}`, +target.value));
    } else {
      error.current = true;
    }
  };

  return (
    <div className={styles.statSelect}>
      <input className={styles.statInput} type="number" value={newVal} onChange={handleStatChange} onFocus={(e) => e.target.select()}/>
      {error.current && <p className={styles.inputError}>Incorrect Value</p>}
    </div>
  )
};

export default StatsSelect;
