import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";
import styles from './header.module.scss';

const StatsSection = () => {
  const stat = useSelector((state: RootState) => state.characterStats);
  return (
    <div className={styles.highlights}>
      <div className={styles.highlight}>
        <p className={styles.highlightedStats}>{stat.armorClass}</p>
        <p className={styles.highlightedLabel}>Armor Class</p>
      </div>
      <div className={styles.highlight}>
        <p className={styles.highlightedStats}>{stat.initiative}</p>
        <p className={styles.highlightedLabel}>Initiative</p>
      </div>
      <div className={styles.highlight}>
        <p className={styles.highlightedStats}>{stat.passivePerception}</p>
        <p className={styles.highlightedLabel}>Passive Perception</p>
      </div>
      <div className={styles.highlight}>
        <p className={styles.highlightedStats}>{dndMath.skillProficiency(stat.level)}</p>
        <p className={styles.highlightedLabel}>Proficiency Bonus</p>
      </div>
    </div>
  );
}

export default StatsSection;