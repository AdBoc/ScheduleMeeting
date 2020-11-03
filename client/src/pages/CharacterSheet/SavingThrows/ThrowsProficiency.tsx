import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";
import styles from "./savingThorws.module.scss";
import {tagElement} from "../../../redux/actions";
import {Stats} from "../../../redux/types";

const ThrowsProficiency = () => {
  const taggedThrows = useSelector((state: RootState) => state.other.taggedThrows);
  const stats = useSelector((state: RootState) => state.stats);
  const level = useSelector((state: RootState) => state.characterStats.level);
  const dispatch = useDispatch();

  return (
    <>
      <p className={styles.label}>Saving Throws</p>
      <div className={styles.savingThrows}>
        {Object.entries(stats).map((stat) => (
          <button
            key={stat[0]}
            className={taggedThrows.includes(stat[0]) ? styles.savingButtonTagged : styles.savingButton}
            onClick={({target: any}) => {
              dispatch(tagElement(stat[0] as keyof Stats))
            }}
          >
            {stat[0]} {dndMath.savingThrowProficiency(level, stat[1], taggedThrows.includes(stat[0]))}
          </button>
        ))}
      </div>
    </>
  );
}

export default ThrowsProficiency;