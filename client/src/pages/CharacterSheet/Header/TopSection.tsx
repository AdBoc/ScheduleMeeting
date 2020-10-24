import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import HpForm from "./HpForm";
import styles from './header.module.scss';

const TopSection = () => {
  const background = useSelector((state: RootState) => state.characterReducer.Background);
  const stats = useSelector((state: RootState) => state.characterReducer.MainStats);
  const [showHpForm, setShowHpForm] = useState(false);

  return (
    <div className={styles.topSection}>
      <div>
        <p className={styles.characterName}>{background.Name}</p>
        <p className={styles.characterDetails}>{background.Race} {background.Class} {stats.Level}</p>
      </div>
      <div className={styles.hpField}>
        <p onClick={() => {
          setShowHpForm(prev => !prev)
        }}>{stats.TemporaryHitPoints}/{stats.HitPoints}<span className={styles.hpLabel}>HP</span></p>
        {showHpForm && <HpForm/>}
      </div>
    </div>
  );
}

export default TopSection;