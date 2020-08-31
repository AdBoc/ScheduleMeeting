import React, { useState, useContext } from 'react';
import SpellSlots from './SpellSlots';
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';
import { charMethods } from '../../../Services/CharacterMethods';
import { Spell } from '../../../ts/interfaces';

const Spells = () => {
  const { character, dispatch } = useContext(characterContext);
  const [isSlots, setIsSlots] = useState(false);
  const [isProfSelect, setIsProfSelect] = useState(false);
  const [details, setDetails] = useState<Spell | null>(null);

  const handleProf = () => setIsProfSelect(prev => !prev);
  const handleSlots = () => setIsSlots(prev => !prev);
  const handleSelect = ({ target }: any) => {
    dispatch({ type: Types.EDIT_TEXT, payload: { property: "Other.SpellProficiency", newValue: target.value } });
    setIsProfSelect(prev => !prev);
  };
  const handleDetails = (spell: Spell) => () => {
    if (details) return setDetails(null);
    setDetails(spell);
  };
  const deleteItem = ({ target }: any) => {
    dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property: "Spells", id: target.name } });
    setDetails(null);
  };

  return (
    <>
      <div className="spells__menu">
        <div className="menu__info">
          <p className="">Save DC: {character.Other.SpellProficiency !== null ? <span>{8 + charMethods.calcProficiency(character.MainStats.Level) + charMethods.calcStatModificator((character.Stats as any)[(character.Other.SpellProficiency as any)])}</span> : <span onClick={handleProf}>Modifier Not Selected</span>}</p>
          <p className="">Attack Bonus: {character.Other.SpellProficiency !== null ? <span>{charMethods.calcProficiency(character.MainStats.Level) + charMethods.calcStatModificator((character.Stats as any)[(character.Other.SpellProficiency as any)])}</span> : <span onClick={handleProf}>Modifier Not Selected</span>}</p>
        </div>
        <button className="g-btn menu__button" onClick={handleSlots}>Spell Slots</button>
      </div>
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
        <div className="spells-grid">
          <p>Name</p>
          <p>Level</p>
          <p>Range</p>
          <p>School</p>
          <p>Components</p>
        </div>
        {character.Spells.map((spell) => (
          <div className="spells-grid" key={spell.id} onClick={handleDetails(spell)}>
            <p>{spell.name}</p>
            <p>{spell.level}</p>
            <p>{spell.range}</p>
            <p>{spell.school}</p>
            <p>{spell.components}</p>
          </div>
        ))}
      </div>
      {details &&
        <div className="details">
          <p className="details__text">Name: {details.name}</p>
          <p className="details__text">Time: {details.castingTime}</p>
          <p className="details__text">Comp: {details.components}</p>
          <p className="details__text">Range: {details.range}</p>
          <p className="details__text">Name: {details.description}</p>
          <button className="details__text" name={details.id} onClick={deleteItem}>DELETE</button>
        </div>
      }
    </>
  )
};

export default Spells;
