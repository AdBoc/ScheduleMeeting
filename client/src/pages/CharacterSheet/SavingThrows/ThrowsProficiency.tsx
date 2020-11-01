import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";
import styles from "./savingThorws.module.scss";

const ThrowsProficiency = () => {
  const character = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return (
    <>
      <p className={styles.label}>Saving Throws</p>
      <div className={styles.savingThrows}>
        {Object.entries(character.characterStats).map((stat, i) => (
            <button key={i} className={character.other.TaggedThrows.includes(stat[0]) ? styles.savingButtonTagged : styles.savingButton} name={stat[0]} onClick={({target}: any) => {
              // dispatch(tagElement(target.name))
            }}>
              {stat[0]} {dndMath.savingThrowProficiency(character.characterStats.level, stat[1], character.other.TaggedThrows.includes(stat[0]))}
            </button>
          )
        )}
      </div>
    </>
  );
}

export default ThrowsProficiency;