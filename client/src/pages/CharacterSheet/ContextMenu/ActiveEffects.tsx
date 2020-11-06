import React from 'react';

import {activeEffects} from "../../../redux/selectors";
import {useSelector} from "react-redux";

import styles from "./contextMenu.module.scss";

const ActiveEffects = () => {
  const effects = useSelector(activeEffects);
  if (effects.length === 0) return <p className={styles.noEffects}>No Active Effects</p>;
  return (
    <>
      {effects.map(effect => (
        <div key={effect.id} className={styles.effectWrapper}>
          <p className={styles.effectName}>{effect.name}</p>
          <p>{effect.description}</p>
        </div>)
      )}
    </>
  );
}

export default ActiveEffects;