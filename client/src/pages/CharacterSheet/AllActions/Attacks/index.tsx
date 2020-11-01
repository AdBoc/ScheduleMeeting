import React from 'react';
import AddAttack from "./AddAttack";
import {useDispatch, useSelector} from "react-redux";
import {dndMath} from "../../../../utils/dndMath";
import {Attack} from "../../../../redux/types";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import {sortedAttacks} from "../../../../redux/selectors";
import {RootState} from "../../../../redux/reducers";
import styles from "./attacks.module.scss";
import CustomPopup from "../../../../components/CustomPopup/CustomPopup";

const Attacks = () => {
  const {showForm, itemDetails, setShowForm, handleHideItem, handleShowItem, setItemDetails} = useCustomForm<Attack>();
  const attacks = useSelector(sortedAttacks);
  const stats = useSelector((state: RootState) => state.stats);
  const playerLevel = useSelector((state: RootState) => state.characterStats.level);
  const dispatch = useDispatch();

  const handleDelete = () => {
    // if (!!itemDetails) dispatch(deleteInArray("Attacks", itemDetails.id));
    handleHideItem();
  }

  return (
    <>
      <button className={styles.newAttackButton} onClick={() => setShowForm(prev => !prev)}>Add attack</button>
      {showForm && <CustomPopup hideElement={setShowForm}>
          <AddAttack handleClose={setShowForm}/>
      </CustomPopup>
      }
      <div>
        <div className={styles.attacksGrid}>
          <p>Name</p>
          <p>Attack</p>
          <p>Hit</p>
          <p>Range</p>
        </div>
        {/*{attacks.length !==0 ? attacks.map(attack => (*/}
        {/*  <div key={attack.id} className={styles.attacksGrid} onClick={handleShowItem(attack)}>*/}
        {/*    <p className={styles.attacksName}>{attack.name}</p>*/}
        {/*    <p>{attack.diceType} + {(dndMath.statModifier(stats[attack.profMod as keyof Character["Stats"]]) + attack.bonusDamage)}</p>*/}
        {/*    {attack.proficient ? <p>1d20*/}
        {/*        + {dndMath.statModifier(stats[attack.profMod as keyof Character["Stats"]]) + dndMath.skillProficiency(playerLevel) + attack.bonusHit}</p> :*/}
        {/*      <p>d20 + {dndMath.statModifier(stats[attack.profMod as keyof Character["Stats"]]) + attack.bonusHit}</p>*/}
        {/*    }*/}
        {/*    <p>{attack.range}</p>*/}
        {/*  </div>*/}
        {/*)) : (*/}
        {/*  <p className={styles.emptyList}>Attacks list is empty</p>*/}
        {/*)}*/}
        {itemDetails &&
        <CustomPopup hideElement={setItemDetails}>
            <div className={styles.attackDetails}>
                <p className={styles.detailsLabel}>Name: {itemDetails.name}</p>
                <p className={styles.detailsLabel}>Ability Mod: {itemDetails.profMod}</p>
                <p className={styles.detailsLabel}>Dice: {itemDetails.diceType}</p>
                <p className={styles.detailsLabel}>Bonus Damage: {itemDetails.bonusDamage}</p>
                <p className={styles.detailsLabel}>Range: {itemDetails.range}</p>
                <p className={styles.detailsLabel}>Damage Type: {itemDetails.type}</p>
                <button className={styles.detailsDelete} name={itemDetails.id} onClick={handleDelete}>DELETE</button>
            </div>
        </CustomPopup>
        }
      </div>
    </>
  );
}

export default Attacks;