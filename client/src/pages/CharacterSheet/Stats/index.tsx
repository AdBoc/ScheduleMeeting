import React from 'react';
import {RootState} from "../../../redux/reducers";
import {useSelector} from "react-redux";

import {dndMath} from "../../../utils/dndMath";

import StatsSelect from "./StatsSelect";
import styles from "./stats.module.scss";

const hpColors: any = {
  "-5": styles.veyLowStat,
  "-4": styles.veyLowStat,
  "-3": styles.negativeStat,
  "-2": styles.negativeStat,
  "-1": styles.negativeStat,
  0: styles.neutralStat,
  1: styles.positiveStat,
  2: styles.positiveStat,
  3: styles.positiveStat,
  4: styles.veryHighStat,
  5: styles.veryHighStat,
}

const Stats = () => {
  const stats = useSelector((state: RootState) => state.character.Stats);
  return (
    <>
      {Object.entries(stats).map((stat) => {
        const modValue = dndMath.statModifier(stat[1]);
        return (
          <div key={stat[0]} className={styles.stat}>
            <StatsSelect statName={stat[0]} statVal={stat[1]}/>
            <p className={styles.statName}>{stat[0]}</p>
            <p className={styles.statMod}>MOD</p>
            <p className={`${styles.statModVal} ${hpColors[modValue]}`}>{modValue}</p>
          </div>
        )
      })}
    </>
  );
}

export default Stats;