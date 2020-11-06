import React from "react";
import styles from "./spells.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {changeMaxSlotValue, decrementCurrentSpellSlot, restSlots} from "../../../../redux/actions";

const SpellSlots = () => {
  const allSlots = useSelector((state: RootState) => state.other.spellSlots);
  const currentSlots = useSelector((state: RootState) => state.other.currentSlots);
  const dispatch = useDispatch();

  return (
    <div className={styles.spellSlotsComponent}>
      {allSlots.map((slot, i) => (
        <div key={i} className={styles.spellSlot}>
          <p className={styles.slotLevel}>Level {i + 1}:</p>
          <button
            className={styles.currentSpellCount}
            onClick={() => {dispatch(decrementCurrentSpellSlot(i))}}
          >
            {currentSlots[i]}
          </button>
          <p>/</p>
          <input
            className={styles.maxSpellInput}
            name={i.toString()}
            onChange={({target}: any) => {dispatch(changeMaxSlotValue(i, target.value))}}
            onFocus={(e: any) => e.target.select()}
            value={slot}
          />
        </div>
      ))}
      <button onClick={() => {dispatch(restSlots())}} className={styles.addSpell}>Rest</button>
    </div>
  )
}

export default SpellSlots;