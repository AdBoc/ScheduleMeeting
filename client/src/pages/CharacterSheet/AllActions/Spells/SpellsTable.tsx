import React from 'react';
import styles from "./spells.module.scss";
import {useSelector} from "react-redux";
import {selectSortedSpells} from "../../../../redux/selectors";
import {RootState} from "../../../../redux/reducers";
import {Spell} from "../../../../redux/types";

type Props = {
  sortingCriteria: { criteria: string; inverted: boolean };
  handleSorting: ({target}: any) => void;
  handleShowItem: <Object extends Spell>(details: Object) => () => void;
}

const SpellsTable: React.FC<Props> = ({sortingCriteria, handleShowItem, handleSorting}) => {
  const spells = useSelector((state: RootState) => selectSortedSpells(state, sortingCriteria));// console.log(selectSortedSpells.recomputations());

  if (!spells.length) return <p className={styles.emptyList}>Spells list is empty</p>;

  return (
    <>
      <div className={styles.spellsGridLabel}>
        <button className={styles.tableLabel} name="name" onClick={handleSorting}>Name</button>
        <button className={styles.tableLabel} name="level" onClick={handleSorting}>Level</button>
        <button className={styles.tableLabel} name="range" onClick={handleSorting}>Range</button>
        <button className={styles.tableLabel} name="school" onClick={handleSorting}>School</button>
        <p>Components</p>
      </div>
      {spells.map(spell => (
        <div key={spell.id} className={styles.spellsGridList} onClick={handleShowItem(spell)}>
          <p>{spell.name}</p>
          <p>{spell.level}</p>
          <p>{spell.range}</p>
          <p>{spell.school}</p>
          <p>{spell.components}</p>
        </div>
      ))}
    </>
  );
}

export default SpellsTable;