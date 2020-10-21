import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {dndMath} from "../../../../utils/dndMath";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import {Character, Spell} from "../../../../redux/types";
import {deleteInArray, editText} from "../../../../redux/actions";
import AddSpell from "./AddSpell";
import {useSortState} from "../../../../hooks/useSortState";

const Spells = () => {
  const character = useSelector((state: RootState) => state.characterReducer);
  const dispatch = useDispatch();

  const {showForm, itemDetails, ref, handleShowItem, handleShowForm, handleHideItem} = useCustomForm<Spell>()
  const {sortedState, handleSorting} = useSortState([...character.Spells])

  const handleDelete = () => {
    handleHideItem();
    dispatch(deleteInArray("Spells", itemDetails!.id));
  }

  return (
    <>
      <button onClick={handleShowForm}>Add spell</button>
      {showForm && <AddSpell handleClose={handleShowForm}/>}
      <div>
        <p>Save DC: {character.Other.SpellProficiency !== null ?
          <span>{8 + dndMath.skillProficiency(character.MainStats.Level) + dndMath.statModifier(character.Stats[character.Other.SpellProficiency as keyof Character["Stats"]])}</span> :
          <span>SelectProf</span>}</p>
        <p>Attack Bonus: {character.Other.SpellProficiency !== null ?
          <span>{dndMath.skillProficiency(character.MainStats.Level) + dndMath.statModifier(character.Stats[(character.Other.SpellProficiency as keyof Character["Stats"])])}</span> :
          <span>Select Prof</span>}</p>
        {character.Other.SpellProficiency === null && (
          <select onChange={({target}: any) => dispatch(editText("Other.SpellProficiency", target.value))}>
            <option value="Strength">Strength</option>
            <option value="Dexterity">Dexterity</option>
            <option value="Constitution">Constitution</option>
            <option value="Charisma">Charisma</option>
            <option value="Intelligence">Intelligence</option>
            <option value="Wisdom">Wisdom</option>
          </select>
        )}
      </div>
      <div>
        <div>
          <button name="name" onClick={handleSorting}>Name</button>
          <button name="level" onClick={handleSorting}>Level</button>
          <button name="range" onClick={handleSorting}>Range</button>
          <button name="school" onClick={handleSorting}>School</button>
          <p>Components</p>
        </div>
        {sortedState.map(spell => (
          <div key={spell.id} onClick={handleShowItem(spell)}>
            <p>{spell.name}</p>
            <p>{spell.level}</p>
            <p>{spell.range}</p>
            <p>{spell.school}</p>
            <p>{spell.components}</p>
          </div>
        ))}
      </div>
      {itemDetails &&
      <div ref={ref}>
          <p>Name: {itemDetails.name}</p>
          <p>Time: {itemDetails.castingTime}</p>
          <p>Comp: {itemDetails.components}</p>
          <p>Range: {itemDetails.range}</p>
          <p>Name: {itemDetails.description}</p>
          <button name={itemDetails.id} onClick={handleDelete}>DELETE</button>
      </div>
      }
    </>
  );
}

export default Spells;