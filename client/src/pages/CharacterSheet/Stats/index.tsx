import React from 'react';
import {RootState} from "../../../redux/reducers";
import {useSelector} from "react-redux";

import {dndMath} from "../../../utils/dndMath";

import StatsSelect from "./StatsSelect";
import styles from "./stats.module.scss";

const Stats = () => {
  const stats = useSelector((state: RootState) => state.characterReducer.Stats)
  return (
    <>
      {Object.entries(stats).map((stat, i) => (
        <div key={i} className={styles.stat}>
          <StatsSelect statName={stat[0]} statVal={stat[1]}/>
          <p className={styles.statName}>{stat[0]}</p>
          <p className={styles.statMod}>MOD</p>
          <p className={styles.statModVal}>{dndMath.statModifier(stat[1])}</p>
        </div>
      ))}
    </>
  );
}

export default Stats;