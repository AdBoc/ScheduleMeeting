import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {changeStatValue} from "../../../redux/actions";
import styles from "./stats.module.scss";

interface IProps {
  statName: string;
  statVal: number;
}

const StatsSelect: React.FC<IProps> = ({statName, statVal}) => {
  const dispatch = useDispatch();
  const [newVal, setNewVal] = useState(statVal);
  const error = useRef(false);

  const handleStatChange = ({target}: any) => {
    error.current = false
    setNewVal(target.value);
    if (/^\b([1-9]|[12][0-9]|30)\b/.test(target.value)) dispatch(changeStatValue(`Stats.${statName}`, +target.value));
    else error.current = true;//TODO: Recalculate skills on stat change
  };

  return (
    <>
      <input className={styles.statInput} type="number" value={newVal} onChange={handleStatChange} onFocus={(e) => e.target.select()}/>
      {error.current && <p>"Incorrect Value"</p>}
    </>
  )
};

export default StatsSelect;
