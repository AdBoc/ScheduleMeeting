import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {dndMath} from "../../../../utils/dndMath";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import {Spell, Stats} from "../../../../redux/types";
import AddSpell from "./AddSpell";
import styles from "./spells.module.scss";
import CustomPopup from "../../../../components/CustomPopup/CustomPopup";
import SpellSlots from "./SpellSlots";
import SpellsTable from "./SpellsTable";
import {changeSpellProficiency, deleteSpell} from "../../../../redux/actions";

const Spells = () => {
  const [sortingOptions, setSortingOptions] = useState({criteria: "name", inverted: false});
  const [isSpellSlots, setIsSpellSlots] = useState(false);
  const stats = useSelector((state: RootState) => state.stats);
  const playerLevel = useSelector((state: RootState) => state.characterStats.level);
  const spellProficiency = useSelector((state: RootState) => state.other.spellProficiency);
  const dispatch = useDispatch();

  const {showForm, itemDetails, setShowForm, handleHideItem, handleShowItem, setItemDetails} = useCustomForm<Spell>();

  const handleDelete = () => {
    if (!!itemDetails) dispatch(deleteSpell(itemDetails.id));
    handleHideItem();
  };

  const handleSorting = ({target}: any) => setSortingOptions(prev => {
    if (prev.criteria === target.name) return {...prev, inverted: !prev.inverted};
    return {criteria: target.name, inverted: false};
  });

  return (
    <>
      <div className={styles.buttonsRow}>
        <button className={styles.genericButton} onClick={() => setIsSpellSlots(prev => !prev)}>Spell Slots</button>
        <button className={styles.genericButton} onClick={() => {setShowForm(prev => !prev)}}>Add spell</button>
        <p className={styles.spellStats}>Save DC: {spellProficiency !== null ?
          <span>{8 + dndMath.skillProficiency(playerLevel) + dndMath.statModifier(stats[spellProficiency as keyof Stats])}</span> :
          <span>?</span>}</p>
        <p className={styles.spellStats}>Atk Bonus: {spellProficiency !== null ?
          <span>{dndMath.skillProficiency(playerLevel) + dndMath.statModifier(stats[spellProficiency as keyof Stats])}</span> :
          <span>?</span>}</p>
      </div>
      <div>
        {spellProficiency === null && (
          <select className={styles.proficiencySelect} onChange={({target}: any) => dispatch(changeSpellProficiency(target.value))}>
            <option value="Strength">Strength</option>
            <option value="Dexterity">Dexterity</option>
            <option value="Constitution">Constitution</option>
            <option value="Charisma">Charisma</option>
            <option value="Intelligence">Intelligence</option>
            <option value="Wisdom">Wisdom</option>
          </select>
        )}
      </div>
      <SpellsTable sortingCriteria={sortingOptions} handleSorting={handleSorting} handleShowItem={handleShowItem}/>
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
              <p className={styles.labelDetails}>Description: {itemDetails.description}</p>
              <button className={styles.deleteDetails} name={itemDetails.id} onClick={handleDelete}>DELETE</button>
          </div>
      </CustomPopup>
      }
    </>
  );
}

export default Spells;