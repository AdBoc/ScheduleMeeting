import React from 'react';
import styles from "./effects.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {Effect} from "../../../../redux/types";
import {changeEffectStatus} from "../../../../redux/actions";

type Props = {
  handleShowItem: <Object extends Effect>(details: Object) => () => void;
}

const EffectsTable: React.FC<Props> = ({handleShowItem}) => {
  const effects = useSelector((state: RootState) => state.effects);
  const dispatch = useDispatch();

  if (!effects.length) return <p className={styles.emptyList}>Effects list is empty</p>;

  return (
    <div className={styles.effectsWrapper}>
      {effects.map(effect => (
        <div key={effect.id} className={styles.effectWrapper}>
          <p className={styles.effectLabel} onClick={handleShowItem(effect)}>{effect.name}</p>
          <input
            className={styles.effectToggleInput}
            id={effect.id}
            type="checkbox"
            name={effect.id}
            onChange={() => {
              dispatch(changeEffectStatus(effect.id))
            }}
            checked={effect.active}
          />
          <label className={styles.effectSwitch} htmlFor={effect.id}>Toggle</label>
        </div>
      ))}
    </div>
  );
}

export default EffectsTable;