import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {dndMath} from "../../../../utils/dndMath";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import {Spell} from "../../../../redux/types";
import AddSpell from "./AddSpell";
import {sortedSpells} from "../../../../redux/selectors";
import styles from "./spells.module.scss";
import CustomPopup from "../../../../components/CustomPopup/CustomPopup";
import SpellSlots from "./SpellSlots";

const Spells = () => {
  const [sortingOptions, setSortingOptions] = useState({criteria: "name", inverted: false});
  const [isSpellSlots, setIsSpellSlots] = useState(false);
  const spells = useSelector(sortedSpells(sortingOptions));
  const stats = useSelector((state: RootState) => state.stats);
  const playerLevel = useSelector((state: RootState) => state.characterStats.level);
  const spellProficiency = useSelector((state: RootState) => state.other.SpellProficiency);
  const dispatch = useDispatch();

  const {showForm, itemDetails, setShowForm, handleHideItem, handleShowItem, setItemDetails} = useCustomForm<Spell>();

  const handleDelete = () => {
    // if (!!itemDetails) dispatch(deleteInArray("Spells", itemDetails.id));
    handleHideItem();
  };

  const handleSorting = ({target}: any) => setSortingOptions(prev => {
    if (prev.criteria === target.name) return {...prev, inverted: !prev.inverted};
    return {criteria: target.name, inverted: false};
  });

  return (
    <>
      {/*<div className={styles.buttonsRow}>*/}
      {/*  <button className={styles.genericButton} onClick={() => setIsSpellSlots(prev => !prev)}>Spell Slots</button>*/}
      {/*  <button className={styles.genericButton} onClick={() => {*/}
      {/*    setShowForm(prev => !prev)*/}
      {/*  }}>Add spell*/}
      {/*  </button>*/}
      {/*  <p className={styles.spellStats}>Save DC: {spellProficiency !== null ?*/}
      {/*    <span>{8 + dndMath.skillProficiency(playerLevel) + dndMath.statModifier(stats[spellProficiency as keyof Character["Stats"]])}</span> :*/}
      {/*    <span>?</span>}</p>*/}
      {/*  <p className={styles.spellStats}>Atk Bonus: {spellProficiency !== null ?*/}
      {/*    <span>{dndMath.skillProficiency(playerLevel) + dndMath.statModifier(stats[(spellProficiency as keyof Character["Stats"])])}</span> :*/}
      {/*    <span>?</span>}</p>*/}
      {/*</div>*/}
      <div>
        {/*{spellProficiency === null && (*/}
        {/*  <select onChange={({target}: any) => dispatch(editText("Other.SpellProficiency", target.value))}>*/}
        {/*    <option value="Strength">Strength</option>*/}
        {/*    <option value="Dexterity">Dexterity</option>*/}
        {/*    <option value="Constitution">Constitution</option>*/}
        {/*    <option value="Charisma">Charisma</option>*/}
        {/*    <option value="Intelligence">Intelligence</option>*/}
        {/*    <option value="Wisdom">Wisdom</option>*/}
        {/*  </select>*/}
        {/*)}*/}
      </div>
      <div>
        <div className={styles.spellsGrid}>
          <button className={styles.tableLabel} name="name" onClick={handleSorting}>Name</button>
          <button className={styles.tableLabel} name="level" onClick={handleSorting}>Level</button>
          <button className={styles.tableLabel} name="range" onClick={handleSorting}>Range</button>
          <button className={styles.tableLabel} name="school" onClick={handleSorting}>School</button>
          <p>Components</p>
        </div>
        {spells.length !== 0 ? spells.map(spell => (
          <div key={spell.id} className={styles.spellsGrid} onClick={handleShowItem(spell)}>
            <p>{spell.name}</p>
            <p>{spell.level}</p>
            <p>{spell.range}</p>
            <p>{spell.school}</p>
            <p>{spell.components}</p>
          </div>
        )) : (
          <p className={styles.emptyList}>List is empty</p>
        )}
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
              <p className={styles.labelDetails}>Name: {itemDetails.name}</p>
              <p className={styles.labelDetails}>Time: {itemDetails.castingTime}</p>
              <p className={styles.labelDetails}>Comp: {itemDetails.components}</p>
              <p className={styles.labelDetails}>Range: {itemDetails.range}</p>
              <p className={styles.labelDetails}>Name: {itemDetails.description}</p>
              <button className={styles.deleteDetails} name={itemDetails.id} onClick={handleDelete}>DELETE</button>
          </div>
      </CustomPopup>
      }
    </>
  );
}

export default Spells;