import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeStatValue, decrementStat, incrementStat} from "../../../redux/actions";
import {RootState} from "../../../redux/reducers";
import styles from "./header.module.scss";

const HpForm = () => {
  const mainStats = useSelector((state: RootState) => state.character.MainStats);
  const dispatch = useDispatch();
  const [hp, setHp] = useState<{ val: string | number, invert: boolean }>({val: "", invert: false});

  const handleSubmit = () => {
    const {HitPoints, TemporaryHitPoints} = mainStats;
    if (!hp.val) return;
    let newVal = TemporaryHitPoints + (hp.val as number)
    if (newVal < 0) newVal = 0;
    else if (newVal > HitPoints) newVal = HitPoints
    dispatch(changeStatValue("MainStats.TemporaryHitPoints", newVal));
    setHp({val: "", invert: false});
  };

  const handleIncrement = () => {
    if (mainStats.TemporaryHitPoints !== mainStats.HitPoints)
      dispatch(incrementStat("MainStats.TemporaryHitPoints"));
  }

  const handleDecrement = () => {
    if (mainStats.TemporaryHitPoints !== 0)
      dispatch(decrementStat("MainStats.TemporaryHitPoints"));
  }

  const handleHpChange = ({target}: any) => {
    if (!target.value) return setHp(prev => ({...prev, val: ""}));
    if (hp.invert) return setHp(prev => ({...prev, val: -Math.abs(parseInt(target.value))}));
    setHp(prev => ({...prev, val: parseInt(target.value)}));
  }

  return (
    <div className={styles.hpForm}>
      <div className={styles.hpInputField}>
        <button className={styles.hpFormButtons} onClick={handleDecrement}>-</button>
        <input className={styles.hpFormInput} type="number" name="HpMod" value={hp.val} onChange={handleHpChange} required/>
        <button className={styles.hpFormButtons} onClick={handleIncrement}>+</button>
      </div>
      <div>
        <hr className={styles.hl}/>
        <button className={styles.hpFormButtons} onClick={() => {
          setHp(prev => ({val: -prev.val, invert: !prev.invert}))
        }}>Inverse
        </button>
        <hr className={styles.hl}/>
        <button className={styles.hpFormButtons} onClick={handleSubmit}>OK</button>
      </div>
    </div>
  );
}

export default HpForm;