import React, { useState, useContext } from 'react';
import SpellSlots from './SpellSlots';
import { characterContext } from '../../../context/Character';

const Spells = () => {
  const { character } = useContext(characterContext);
  const [isSlots, setIsSlots] = useState(false);
  const [isProfSelect, setIsProfSelect] = useState(false);

  const handleProf = () => setIsProfSelect(prev => !prev);
  const handleSlots = () => setIsSlots(prev => !prev);

  return (
    <>
      <button className="g-btn" onClick={handleSlots}>Spell Slots</button>
      <p>Spell Save DC: {character.Other.SpellProficiency !== null ? <span>{2 + 5 + 8}</span> : <span onClick={handleProf}>Modifier Not Selected</span>}</p>
      <p>Spell Attack Bonus: {character.Other.SpellProficiency !== null ? <span>{2 + 5}</span> : <span onClick={handleProf}>Modifier Not Selected</span>}</p>
      {isProfSelect && (
        <select className="c-form__input">
          <option value="Strength">Strength</option>
          <option value="Dexterity">Dexterity</option>
          <option value="Constitution">Constitution</option>
          <option value="Charisma">Charisma</option>
          <option value="Intelligence">Intelligence</option>
          <option value="Wisdom">Wisdom</option>
        </select>
      )}
      {isSlots && <SpellSlots />}
      <div className="spells">
        {character.Spells.map((spell) => (
          <div className="spell" key={spell.id}>
            Spell
          </div>
        ))}
      </div>
    </>
  )
};

export default Spells;
