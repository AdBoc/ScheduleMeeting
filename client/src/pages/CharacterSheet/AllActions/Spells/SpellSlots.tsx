import React from "react";
import styles from "./spells.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {setArray} from "../../../../redux/actions";

const SpellSlots = () => {
  const allSlots = useSelector((state: RootState) => state.character.Other.SpellSlots);
  const currentSlots = useSelector((state: RootState) => state.character.Other.CurrentSlots);
  const dispatch = useDispatch();

  const handleDecrement = ({target}: any) => {
    const newSlotsValue = [...currentSlots];
    if (!!newSlotsValue[target.name]) {
      newSlotsValue[target.name] = newSlotsValue[target.name] - 1;
      dispatch(setArray("Other.CurrentSlots", newSlotsValue));
    }
  };
  const handleMaxSpellSlots = ({target}: any) => {
    if (/^[0-9][0-9]*$/.test(target.value)) {
      const newSlotsValue = [...allSlots];
      newSlotsValue[target.name] = parseInt(target.value);
      dispatch(setArray("Other.SpellSlots", newSlotsValue));
    }
  }
  const handleRest = () => dispatch(setArray("Other.CurrentSlots", allSlots));

  return (
    <div className={styles.spellSlotsComponent}>
      {allSlots.map((slot, i) => (
        <div key={i} className={styles.spellSlot}>
          <p className={styles.slotLevel}>Level {i}:</p>
          <button
            name={i.toString()}
            className={styles.currentSpellCount}
            onClick={handleDecrement}
          >
            {currentSlots[i]}
          </button>
          <p>/</p>
          <input
            className={styles.maxSpellInput}
            name={i.toString()}
            onChange={handleMaxSpellSlots}
            onFocus={(e: any) => e.target.select()}
            value={slot}
          />
        </div>
      ))}
      <button onClick={handleRest}>Rest</button>
    </div>
  )
}

export default SpellSlots;