import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeStatValue, decrementStat, incrementStat} from "../../../redux/actions";
import {RootState} from "../../../redux/reducers";

const HpForm = () => {
  const mainStats = useSelector((state: RootState) => state.characterReducer.MainStats);
  const dispatch = useDispatch();
  const [hp, setHp] = useState<{ val: string | number, invert: boolean }>({val: "", invert: false});

  const handleSubmit = () => {
    const {HitPoints, TemporaryHitPoints} = mainStats;
    if (!hp.val) return;
    let newVal = TemporaryHitPoints + (hp.val as number)
    if (newVal < 0) newVal = 0;
    else if (newVal > HitPoints) newVal = HitPoints
    dispatch(changeStatValue("MainStats.TemporaryHitPoints", newVal));
  };

  const handleHpChange = ({target}: any) => {
    if (!target.value) return setHp(prev => ({...prev, val: ""}));
    if (hp.invert) return setHp(prev => ({...prev, val: -Math.abs(parseInt(target.value))}));
    setHp(prev => ({...prev, val: parseInt(target.value)}));
  }

  return (
    <div>
      <div>
        <button onClick={() => {
          dispatch(decrementStat("MainStats.TemporaryHitPoints"))
        }}>-
        </button>
        <input type="number" name="HpMod" value={hp.val} onChange={handleHpChange} required/>
        <button onClick={() => {
          dispatch(incrementStat("MainStats.TemporaryHitPoints"))
        }}>+
        </button>
      </div>
      <div>
        <hr/>
        <button onClick={() => {
          setHp(prev => ({val: -prev.val, invert: !prev.invert}))
        }}>Inverse
        </button>
        <hr/>
        <button onClick={handleSubmit}>OK</button>
      </div>
    </div>
  );
}

export default HpForm;