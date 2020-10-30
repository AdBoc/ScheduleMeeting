import React from 'react';
import {useSelector} from "react-redux";
import {activeEffects} from "../../../redux/selectors";
import styles from "./contextMenu.module.scss";

const ActiveEffects = () => {
  const effects = useSelector(activeEffects);
  return (
    <>
      {effects.length !== 0 ? (
        effects.map(effect => (
          <div key={effect.id} className={styles.effectWrapper}>
            <p className={styles.effectName}>{effect.name}</p>
            <p>{effect.description}</p>
          </div>
        ))
      ) : (
        <p className={styles.noEffects}>No Active Effects</p>
      )}
    </>
  );
}

export default ActiveEffects;