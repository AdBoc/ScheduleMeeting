import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./modifyStatField.module.scss";
import {CharacterStats} from "../../redux/types";
import {RootState} from "../../redux/reducers";
import {decrementStat, incrementStat} from "../../redux/actions";

interface IProps {
  label: string;
  statName: keyof CharacterStats;
}

const ModifyStatField: React.FC<IProps> = ({label, statName}) => {
  const statValue = useSelector((state: RootState) => state.characterStats[statName]);
  const dispatch = useDispatch();
  return (
    <div className={styles.modifyFieldWrapper}>
      <p>{label}</p>
      <div>
        <button
          className={styles.modifyIcon}
          onClick={() => {
            dispatch(decrementStat(statName))
          }}>-
        </button>
        <p className={styles.value}>{statValue}</p>
        <button
          className={styles.modifyIcon}
          onClick={() => {
            dispatch(incrementStat(statName))
          }}>+
        </button>
      </div>
    </div>
  );
}

export default React.memo(ModifyStatField);