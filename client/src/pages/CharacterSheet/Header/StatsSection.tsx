import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";
import styles from './header.module.scss';

const StatsSection = () => {
  const passivePerception = useSelector((state: RootState) => state.characterStats.passivePerception);
  const armorClass = useSelector((state: RootState) => state.characterStats.armorClass);
  const initiative = useSelector((state: RootState) => state.characterStats.initiative);
  const level = useSelector((state: RootState) => state.characterStats.level);

  return (
    <div className={styles.highlights}>
      <div className={styles.highlight}>
        <p className={styles.highlightedStats}>{armorClass}</p>
        <p className={styles.highlightedLabel}>Armor Class</p>
      </div>
      <div className={styles.highlight}>
        <p className={styles.highlightedStats}>{initiative}</p>
        <p className={styles.highlightedLabel}>Initiative</p>
      </div>
      <div className={styles.highlight}>
        <p className={styles.highlightedStats}>{passivePerception}</p>
        <p className={styles.highlightedLabel}>Passive Perception</p>
      </div>
      <div className={styles.highlight}>
        <p className={styles.highlightedStats}>{dndMath.skillProficiency(level)}</p>
        <p className={styles.highlightedLabel}>Proficiency Bonus</p>
      </div>
    </div>
  );
}

export default StatsSection;