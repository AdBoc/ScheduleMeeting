import React from 'react';
import {useDispatch} from "react-redux";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import {Effect} from "../../../../redux/types";
import CustomPopup from "../../../../components/CustomPopup/CustomPopup";
import AddEffect from "./AddEffect";
import styles from "./effects.module.scss";
import {deleteEffect} from "../../../../redux/actions";
import EffectsTable from "./EffectsTable";

const Effects = () => {
  const dispatch = useDispatch();
  const {showForm, itemDetails, setShowForm, handleHideItem, handleShowItem, setItemDetails} = useCustomForm<Effect>();

  const handleDelete = () => {
    if (!!itemDetails) dispatch(deleteEffect(itemDetails.id));
    handleHideItem();
  }

  return (
    <>
      <button className={styles.addEffectButton} onClick={() => setShowForm(prev => !prev)}>Add effect</button>
      {showForm && <CustomPopup hideElement={setShowForm}>
          <AddEffect handleClose={setShowForm}/>
      </CustomPopup>
      }
      <EffectsTable handleShowItem={handleShowItem}/>
      {itemDetails && <CustomPopup hideElement={setItemDetails}>
          <div className={styles.effectDetails}>
              <p className={styles.detailsLabel}>{itemDetails.name}</p>
              <p className={styles.detailsLabel}>{itemDetails.description}</p>
              <button className={styles.detailsDelete} onClick={handleDelete}>DELETE</button>
          </div>
      </CustomPopup>}
    </>
  );
}

export default Effects;