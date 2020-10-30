import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";
import {tagElement} from "../../../redux/actions";
import styles from "./savingThorws.module.scss";

const ThrowsProficiency = () => {
  const character = useSelector((state: RootState) => state.character);
  const dispatch = useDispatch();

  return (
    <>
      <p className={styles.label}>Saving Throws</p>
      <div className={styles.savingThrows}>
        {Object.entries(character.Stats).map((stat, i) => (
            <button key={i} className={character.Other.TaggedThrows.includes(stat[0]) ? styles.savingButtonTagged : styles.savingButton} name={stat[0]} onClick={({target}: any) => {
              dispatch(tagElement(target.name))
            }}>
              {stat[0]} {dndMath.savingThrowProficiency(character.MainStats.Level, stat[1], character.Other.TaggedThrows.includes(stat[0]))}
            </button>
          )
        )}
      </div>
    </>
  );
}

export default ThrowsProficiency;