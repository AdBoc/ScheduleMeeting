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

  const handleChangeRest = ({ target }: any) => {
    const slotsCopy = [...character.Other.ShortRestSlots];
    slotsCopy[target.name] = +target.value;
    dispatch({ type: Types.SET_ARRAY, payload: { property: "Other.ShortRestSlots", newArr: slotsCopy } });
  };

  const handleDecrement = ({ target }: any) => {
    if (!character.Other.CurrentSlots[target.name]) return;
    const slotsCopy = [...character.Other.CurrentSlots];
    slotsCopy[target.name] = slotsCopy[target.name] - 1;
    dispatch({ type: Types.SET_ARRAY, payload: { property: "Other.CurrentSlots", newArr: slotsCopy } });
  };

  const handleLongRest = () => dispatch({ type: Types.SET_ARRAY, payload: { property: "Other.CurrentSlots", newArr: character.Other.SpellSlots } });

  const handleShortRest = () => {
    const slotsCopy = [...character.Other.CurrentSlots];
    for (let i = 0; i < slotsCopy.length; i++) {
      slotsCopy[i] += character.Other.ShortRestSlots[i];
    }
    dispatch({ type: Types.SET_ARRAY, payload: { property: "Other.CurrentSlots", newArr: slotsCopy } });
  };

  return (
    <>
      <button className="g-btn" onClick={handleLongRest}>LONG REST</button>
      <button className="g-btn" onClick={handleShortRest}>SHORT REST</button>
      <p>CURRENT SLOTS</p>
      <div className="spell-slots">
        {character.Other.CurrentSlots.map((slot, index) => (
          <button key={index} className="spell-slot" name={index.toString()} onClick={handleDecrement}>Level {index + 1}: {slot}</button>
        ))}
      </div>
      <p>MAX SLOTS VALUES</p>
      <div className="slots">
        {character.Other.SpellSlots.map((slot, index) => (
          <label key={index} className="slot">{index + 1}<input className="slot__input" type="number" name={index.toString()} value={slot} onChange={handleChange} onFocus={(e: any) => e.target.select()} /></label>
        ))}
      </div>
      <p>SHORT REST VALUES</p>
      <div className="slots">
        {character.Other.ShortRestSlots.map((slot, index) => (
          <label key={index} className="slot">{index + 1}<input className="slot__input" type="number" name={index.toString()} value={slot} onChange={handleChangeRest} onFocus={(e: any) => e.target.select()} /></label>
        ))}
      </div>
    </>
  );
};

export default SpellSlots;