import React, { useState, useContext, useEffect, useRef } from 'react';
import SpellSlots from './SpellSlots';
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';
import { charMethods } from '../../../Services/CharacterMethods';
import { Spell } from '../../../ts/interfaces';
import useOutsideClick from '../../../hooks/useOutsideClick';

const Spells = () => {
  const { character, dispatch } = useContext(characterContext);
  const [sortType, setSortType] = useState({ type: 'name', inverted: false });
  const [spells, setSpells] = useState(character.Spells);
  const [isSlots, setIsSlots] = useState(false);
  const [isProfSelect, setIsProfSelect] = useState(false);
  const [details, setDetails] = useState<Spell | null>(null);

  const ref = useRef(null);
  useOutsideClick(ref, () => { if (details) setDetails(null) });

  useEffect(() => {
    setSpells(character.Spells);
  }, [character.Spells]);

  useEffect(() => {
    const copySpells = spells.slice(0);
    copySpells.sort((a, b) => a[sortType.type as keyof Spell].localeCompare(b[sortType.type as keyof Spell]));
    if (sortType.inverted)
      copySpells.reverse();
    setSpells(copySpells);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  const handleProf = () => setIsProfSelect(prev => !prev);
  const handleSlots = () => setIsSlots(prev => !prev);
  const handleSelect = ({ target }: any) => {
    dispatch({ type: Types.EDIT_TEXT, payload: { property: "Other.SpellProficiency", newValue: target.value } });
    setIsProfSelect(prev => !prev);
  };
  const handleDetails = (spell: Spell) => () => {
    setDetails(spell);
  };
  const deleteItem = ({ target }: any) => {
    dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property: "Spells", id: target.name } });
    setDetails(null);
  };
  const handleSortOption = ({ target }: any) => setSortType(prev => {
    if (prev.type === target.name) return { type: target.name, inverted: !prev.inverted };
    return { type: target.name, inverted: false };
  });

  return (
    <>
      <div className="spells__menu">
        <div className="menu__info">
          <p>Save DC: {character.Other.SpellProficiency !== null ? <span>{8 + charMethods.calcProficiency(character.MainStats.Level) + charMethods.calcStatModificator((character.Stats as any)[(character.Other.SpellProficiency as any)])}</span> : <span onClick={handleProf}>Modifier Not Selected</span>}</p>
          <p>Attack Bonus: {character.Other.SpellProficiency !== null ? <span>{charMethods.calcProficiency(character.MainStats.Level) + charMethods.calcStatModificator((character.Stats as any)[(character.Other.SpellProficiency as any)])}</span> : <span onClick={handleProf}>Modifier Not Selected</span>}</p>
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
      <div>
        <div className="grid-border spells-grid">
          <button name="name" onClick={handleSortOption}>Name</button>
          <button name="level" onClick={handleSortOption}>Level</button>
          <button name="range" onClick={handleSortOption}>Range</button>
          <button name="school" onClick={handleSortOption}>School</button>
          <p>Components</p>
        </div>
        {spells.map((spell) => (
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
        <div className="details" ref={ref}>
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
