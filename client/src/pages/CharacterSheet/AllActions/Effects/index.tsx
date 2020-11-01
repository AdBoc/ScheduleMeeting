import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import {Effect} from "../../../../redux/types";
import CustomPopup from "../../../../components/CustomPopup/CustomPopup";
import AddEffect from "./AddEffect";
import styles from "./effects.module.scss";

const Effects = () => {
  const effects = useSelector((state: RootState) => state.effects);
  const dispatch = useDispatch();
  const {showForm, itemDetails, setShowForm, handleHideItem, handleShowItem, setItemDetails} = useCustomForm<Effect>();

  const changeActivity = ({target}: any) => {
    const effectIndex = effects.findIndex((effect) => effect.id === target.name);
    const newEffectsArray = [...effects];
    newEffectsArray[effectIndex].active = !newEffectsArray[effectIndex].active;
    // dispatch(setArray("Effects", newEffectsArray));
  };

  const handleDelete = () => {
    // if (!!itemDetails) dispatch(deleteInArray("Effects", itemDetails.id));
    handleHideItem();
  }

  return (
    <>
      <button className={styles.addEffectButton} onClick={() => setShowForm(prev => !prev)}>Add effect</button>
      {showForm && <CustomPopup hideElement={setShowForm}>
          <AddEffect handleClose={setShowForm}/>
      </CustomPopup>
      }
      <div className={styles.effectsWrapper}>
        {effects.length !== 0 ? effects.map(effect => (
          <div key={effect.id} className={styles.effectWrapper}>
            <p onClick={handleShowItem(effect)}>{effect.name}</p>
            <input className={styles.effectToggleInput} id={effect.id} type="checkbox" name={effect.id} onChange={changeActivity} checked={effect.active}/>
            <label className={styles.effectSwitch} htmlFor={effect.id}>Toggle</label>
          </div>
        )) : (
          <p className={styles.emptyList}>Effects list is empty</p>
        )}
      </div>
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