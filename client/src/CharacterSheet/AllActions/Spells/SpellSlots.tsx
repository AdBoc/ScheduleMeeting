import React, { useContext } from 'react'
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';

const SpellSlots = () => {
  const { character, dispatch } = useContext(characterContext);

  const handleChange = ({ target }: any) => {
    const slotsCopy = [...character.Other.SpellSlots];
    slotsCopy[target.name] = +target.value;
    dispatch({ type: Types.SET_ARRAY, payload: { property: "Other.SpellSlots", newArr: slotsCopy } });
  };

  const handleDecrement = ({ target }: any) => {
    const slotsCopy = [...character.Other.CurrentSlots];
    slotsCopy[target.name] = slotsCopy[target.name] - 1;
    dispatch({ type: Types.SET_ARRAY, payload: { property: "Other.CurrentSlots", newArr: slotsCopy } });
  }

  const handleLongRest = () => {
    dispatch({ type: Types.SET_ARRAY, payload: { property: "Other.CurrentSlots", newArr: character.Other.SpellSlots } });
  };
  const handleShortRest = () => { };

  return (
    <>
      <button onClick={handleLongRest}>LONG REST</button>
      <button onClick={handleLongRest}>SHORT REST</button>
      <div>
        {character.Other.SpellSlots.map((slot, index) => (
          <label key={index}>Level {index + 1}<input type="number" name={index.toString()} value={slot} onChange={handleChange} onFocus={(e: any) => e.target.select()} /></label>
        ))}
      </div>
      <div className="spell-slots">
        {character.Other.CurrentSlots.map((slot, index) => (
          <button key={index} className="spell-slot" name={index.toString()} onClick={handleDecrement}>Level {index + 1}: {slot}</button>
        ))}
      </div>
    </>
  );
};

export default SpellSlots;