import React from 'react';
import AddAttack from "./AddAttack";
import {useDispatch} from "react-redux";
import {Attack} from "../../../../redux/types";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import styles from "./attacks.module.scss";
import CustomPopup from "../../../../components/CustomPopup/CustomPopup";
import AttacksTable from "./Attacks";
import {deleteAttack} from "../../../../redux/actions";

const Attacks = () => {
  const {showForm, itemDetails, setShowForm, handleHideItem, handleShowItem, setItemDetails} = useCustomForm<Attack>();
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!!itemDetails) dispatch(deleteAttack(itemDetails.id));
    handleHideItem();
  }

  return (
    <>
      <button className={styles.newAttackButton} onClick={() => setShowForm(prev => !prev)}>Add attack</button>
      {showForm && <CustomPopup hideElement={setShowForm}>
          <AddAttack handleClose={setShowForm}/>
      </CustomPopup>
      }
      <AttacksTable handleShowItem={handleShowItem}/>
      {itemDetails && <CustomPopup hideElement={setItemDetails}>
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
    </>
  );
}

export default Attacks;