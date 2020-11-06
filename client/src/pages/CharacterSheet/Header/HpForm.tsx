import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeHp, decrementStat, incrementStat} from "../../../redux/actions";
import {RootState} from "../../../redux/reducers";
import styles from "./header.module.scss";

const HpForm = () => {
  const maxHitPoints = useSelector((state: RootState) => state.characterStats.hitPoints);
  const currentHitPoints = useSelector((state: RootState) => state.characterStats.temporaryHitPoints);
  const [hp, setHp] = useState<{ val: "" | number, invert: boolean }>({val: "", invert: false});
  const dispatch = useDispatch();

  const handleHpChange = ({target}: any) => {
    if (!target.value) return setHp(prev => ({...prev, val: ""}));
    if (hp.invert) return setHp(prev => ({...prev, val: -Math.abs(parseInt(target.value))}));
    setHp(prev => ({...prev, val: parseInt(target.value)}));
  }
  const handleSubmit = () => {
    if (!hp.val) return;
    dispatch(changeHp(hp.val));
    setHp({val: "", invert: false});
  };
  const handleIncrement = () => {
    if (currentHitPoints === maxHitPoints) return;
    dispatch(incrementStat("temporaryHitPoints"));
  }
  const handleDecrement = () => dispatch(decrementStat("temporaryHitPoints"));

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