import React, { useState, useContext } from 'react';
import SpellSlots from './SpellSlots';
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';
import { charMethods } from '../../../Services/CharacterMethods';

const Spells = () => {
  const { character, dispatch } = useContext(characterContext);
  const [isSlots, setIsSlots] = useState(false);
  const [isProfSelect, setIsProfSelect] = useState(false);

  const handleProf = () => setIsProfSelect(prev => !prev);
  const handleSlots = () => setIsSlots(prev => !prev);
  const handleSelect = ({ target }: any) => {
    dispatch({ type: Types.EDIT_TEXT, payload: { property: "Other.SpellProficiency", newValue: target.value } });
    setIsProfSelect(prev => !prev);
  }

  return (
    <>
      <button className="g-btn" onClick={handleSlots}>Spell Slots</button>
      <p>Spell Save DC: {character.Other.SpellProficiency !== null ? <span>{8 + charMethods.calcProficiency(character.MainStats.Level) + charMethods.calcStatModificator((character.Stats as any)[(character.Other.SpellProficiency as any)])}</span> : <span onClick={handleProf}>Modifier Not Selected</span>}</p>
      <p>Spell Attack Bonus: {character.Other.SpellProficiency !== null ? <span>{charMethods.calcProficiency(character.MainStats.Level) + charMethods.calcStatModificator((character.Stats as any)[(character.Other.SpellProficiency as any)])}</span> : <span onClick={handleProf}>Modifier Not Selected</span>}</p>
      {isProfSelect && (
        <select className="c-form__input" onChange={handleSelect}>
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
          <p className="spell" key={spell.id}>
            {spell.name}
          </p>
        ))}
      </div>
    </>
  )
};

export default Spells;
