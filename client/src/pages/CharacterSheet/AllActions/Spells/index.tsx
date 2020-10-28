import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {dndMath} from "../../../../utils/dndMath";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import {Character, Spell} from "../../../../redux/types";
import {deleteInArray, editText} from "../../../../redux/actions";
import AddSpell from "./AddSpell";
import {sortedSpells} from "../../../../redux/selectors";
import styles from "./spells.module.scss";
import CustomPopup from "../../../../components/CustomPopup/CustomPopup";
import SpellSlots from "./SpellSlots";

const Spells = () => {
  const [sortingOptions, setSortingOptions] = useState({criteria: "name", inverted: false});
  const [isSpellSlots, setIsSpellSlots] = useState(false);
  const spells = useSelector(sortedSpells(sortingOptions));
  const stats = useSelector((state: RootState) => state.character.Stats);
  const playerLevel = useSelector((state: RootState) => state.character.MainStats.Level);
  const spellProficiency = useSelector((state: RootState) => state.character.Other.SpellProficiency);
  const dispatch = useDispatch();

  const {showForm, itemDetails, setShowForm, handleHideItem, handleShowItem, setItemDetails} = useCustomForm<Spell>();

  const handleDelete = () => {
    if (!!itemDetails) dispatch(deleteInArray("Spells", itemDetails.id));
    handleHideItem();
  };

  const handleSorting = ({target}: any) => setSortingOptions(prev => {
    if (prev.criteria === target.name) return {...prev, inverted: !prev.inverted};
    return {criteria: target.name, inverted: false};
  });

  return (
    <>
      <button className={styles.genericButton} onClick={() => setIsSpellSlots(prev => !prev)}>Spell Slots</button>
      <button className={styles.newSpellButton} onClick={() => {
        setShowForm(prev => !prev)
      }}>Add spell
      </button>
      <div>
        <p>Save DC: {spellProficiency !== null ?
          <span>{8 + dndMath.skillProficiency(playerLevel) + dndMath.statModifier(stats[spellProficiency as keyof Character["Stats"]])}</span> :
          <span>SelectProf</span>}</p>
        <p>Attack Bonus: {spellProficiency !== null ?
          <span>{dndMath.skillProficiency(playerLevel) + dndMath.statModifier(stats[(spellProficiency as keyof Character["Stats"])])}</span> :
          <span>Select Prof</span>}</p>
        {spellProficiency === null && (
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
        <div className={styles.spellsGrid}>
          <button className={styles.tableLabel} name="name" onClick={handleSorting}>Name</button>
          <button className={styles.tableLabel} name="level" onClick={handleSorting}>Level</button>
          <button className={styles.tableLabel} name="range" onClick={handleSorting}>Range</button>
          <button className={styles.tableLabel} name="school" onClick={handleSorting}>School</button>
          <p>Components</p>
        </div>
        {spells.map(spell => (
          <div key={spell.id} className={styles.spellsGrid} onClick={handleShowItem(spell)}>
            <p>{spell.name}</p>
            <p>{spell.level}</p>
            <p>{spell.range}</p>
            <p>{spell.school}</p>
            <p>{spell.components}</p>
          </div>
        ))}
      </div>
      {isSpellSlots && <CustomPopup hideElement={setIsSpellSlots}><SpellSlots/></CustomPopup>}
      {showForm &&
      <CustomPopup hideElement={setShowForm}>
          <AddSpell handleClose={setShowForm}/>
      </CustomPopup>
      }
      {itemDetails &&
      <CustomPopup hideElement={setItemDetails}>
          <div className={styles.spellDetails}>
              <p>Name: {itemDetails.name}</p>
              <p>Time: {itemDetails.castingTime}</p>
              <p>Comp: {itemDetails.components}</p>
              <p>Range: {itemDetails.range}</p>
              <p>Name: {itemDetails.description}</p>
              <button name={itemDetails.id} onClick={handleDelete}>DELETE</button>
          </div>
      </CustomPopup>
      }
    </>
  );
}

export default Spells;