import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import HpForm from "./HpForm";
import styles from './header.module.scss';
import CustomPopup from "../../../components/CustomPopup/CustomPopup";

const TopSection = () => {
  const background = useSelector((state: RootState) => state.character.Background);
  const stats = useSelector((state: RootState) => state.character.MainStats);
  const [showHpForm, setShowHpForm] = useState(false);

  const styleHp = () => {
    const hpDiv = stats.TemporaryHitPoints / stats.HitPoints;
    if (hpDiv < 0.25) return styles.hpDanger;
    else if (hpDiv < 0.5) return styles.hpWarning;
    else if (hpDiv < 0.75) return styles.hpNormal;
    else return styles.hpGood;
  }

  return (
    <div className={styles.topSection}>
      <div>
        <p className={styles.characterName}>{background.Name}</p>
        <p className={styles.characterDetails}>{background.Race} {background.Class} {stats.Level}</p>
      </div>
      <div className={styles.hpField}>
        <p
          className={styleHp()}
          onClick={() => {
            setShowHpForm(prev => !prev)
          }}>{stats.TemporaryHitPoints}/{stats.HitPoints}<span className={styles.hpLabel}>HP</span></p>
        {showHpForm && <CustomPopup hideElement={setShowHpForm}>
            <HpForm/>
        </CustomPopup>}
      </div>
    </div>
  );
}

export default TopSection;