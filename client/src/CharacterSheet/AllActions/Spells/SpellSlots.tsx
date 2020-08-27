import React, { useContext } from 'react'
import { characterContext } from '../../../context/Character';
const SpellSlots = () => {
  const { character } = useContext(characterContext);

  return (
    <>
      <button>EDIT</button>
      <button>REST</button>
      <div className="spell-slots">
        {character.Other.SpellSlots.map((slot, index) => (
          <div key={index} className="spell-slot">
            Level {index + 1}: {slot}
          </div>
        ))
        }
      </div>
    </>
  );
};
export default SpellSlots;