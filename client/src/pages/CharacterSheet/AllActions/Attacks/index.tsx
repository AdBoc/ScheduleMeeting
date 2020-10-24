import React from 'react';
import AddAttack from "./AddAttack";
import {useDispatch, useSelector} from "react-redux";
import {dndMath} from "../../../../utils/dndMath";
import {Attack, Character} from "../../../../redux/types";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import {deleteInArray} from "../../../../redux/actions";
import {sortedAttacks} from "../../../../redux/selectors";
import {RootState} from "../../../../redux/reducers";
import styles from "./attacks.module.scss";

const Attacks = () => {
  const {showForm, itemDetails, ref, handleShowItem, handleShowForm, handleHideItem} = useCustomForm<Attack>();
  const attacks = useSelector(sortedAttacks);
  const stats = useSelector((state: RootState) => state.characterReducer.Stats);
  const playerLevel = useSelector((state: RootState) => state.characterReducer.MainStats.Level);
  const dispatch = useDispatch();

  const handleDelete = () => {
    handleHideItem();
    dispatch(deleteInArray("Attacks", itemDetails!.id));
  }

  return (
    <>
      <button className={styles.newAttackButton} onClick={handleShowForm}>Add attack</button>
      {showForm && <AddAttack handleClose={handleShowForm}/>}
      <div>
        <div className={styles.attacksGrid}>
          <p>Name</p>
          <p>Attack</p>
          <p>Hit</p>
          <p>Range</p>
        </div>
        {attacks.map(attack => (
          <div key={attack.id} className={styles.attacksGrid} onClick={handleShowItem(attack)}>
            <p className={styles.attacksName}>{attack.name}</p>
            <p>{attack.diceType} + {(dndMath.statModifier(stats[attack.profMod as keyof Character["Stats"]]) + attack.bonusDamage)}</p>
            {attack.proficient ? <p>d20
                + {dndMath.statModifier(stats[attack.profMod as keyof Character["Stats"]]) + dndMath.skillProficiency(playerLevel) + attack.bonusHit}</p> :
              <p>d20 + {dndMath.statModifier(stats[attack.profMod as keyof Character["Stats"]]) + attack.bonusHit}</p>
            }
            <p>{attack.range}</p>
          </div>
        ))}
        {itemDetails &&
        <div ref={ref}>
            <p>Name: {itemDetails.name}</p>
            <p>Ability Mod: {itemDetails.profMod}</p>
            <p>Dice: {itemDetails.diceType}</p>
            <p>Bonus: {itemDetails.bonusDamage}</p>
            <p>Range: {itemDetails.range}</p>
            <p>Type: {itemDetails.type}</p>
            <button name={itemDetails.id} onClick={handleDelete}>DELETE</button>
        </div>
        }
      </div>
    </>
  );
}

export default Attacks;