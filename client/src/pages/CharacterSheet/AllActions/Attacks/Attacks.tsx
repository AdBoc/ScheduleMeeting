import React from 'react';
import styles from "./attacks.module.scss";
import {useSelector} from "react-redux";
import {selectSortedAttacks} from "../../../../redux/selectors";
import {Attack, Stats} from "../../../../redux/types";
import {RootState} from "../../../../redux/reducers";
import {dndMath} from "../../../../utils/dndMath";

type Props = {
  handleShowItem: <Object extends Attack>(details: Object) => () => void;
}

const AttacksTable: React.FC<Props> = ({handleShowItem}) => {
  const attacks = useSelector(selectSortedAttacks);
  const stats = useSelector((state: RootState) => state.stats);
  const playerLevel = useSelector((state: RootState) => state.characterStats.level);

  if (!attacks.length) return <p className={styles.emptyList}>Attacks list is empty</p> //console.log(selectSortedAttacks.recomputations());

  return (
    <>
      <div className={styles.attacksGridLabel}>
        <p>Name</p>
        <p>Attack</p>
        <p>Hit</p>
        <p>Range</p>
      </div>
      {attacks.map(attack => (
        <div key={attack.id} className={styles.attacksGridTable} onClick={handleShowItem(attack)}>
          <p className={styles.attacksName}>{attack.name}</p>
          <p>{attack.diceType} + {dndMath.statModifier(stats[attack.profMod as keyof Stats] + attack.bonusDamage)}</p>
          {attack.proficient ? <p>1d20
              + {dndMath.statModifier(stats[attack.profMod as keyof Stats]) + dndMath.skillProficiency(playerLevel) + attack.bonusHit}</p> :
            <p>d20 + {dndMath.statModifier(stats[attack.profMod as keyof Stats]) + attack.bonusHit}</p>
          }
          <p>{attack.range}</p>
        </div>
      ))}
    </>
  );
}

export default AttacksTable;