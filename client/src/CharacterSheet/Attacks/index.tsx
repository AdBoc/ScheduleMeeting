import React from 'react';
import AddAttack from './AddAttack';
import { useExpandableList } from '../../hooks/useExpandableList';
import { Attack } from '../../ts/interfaces';

interface AttackActive extends Attack {
  active: boolean;
};

const Attacks: React.FC = () => {
  const { extItems, extVisible, showDetails, formVisiblity } = useExpandableList("Attacks");

  return (
    <div className="sheet--view--attacks">
      <button className="g-btn" onClick={formVisiblity}>+ Add Attack</button>
      {extVisible && <AddAttack formVisibility={formVisiblity} />}
      {extItems.map((attack: AttackActive) => {
        return (
          <div key={attack.id} onClick={showDetails(attack.id)}>
            <div className="c-atk">
              <p className="c-atk__field">{attack.name}</p>
              <p className="c-atk__field">{attack.diceType}</p>
              <p className="c-atk__field">{attack.range}</p>
            </div>
            {attack.active && (
              <>
                <p className="c-atk__drop">Name: {attack.name}</p>
                <p className="c-atk__drop">Ability Mod: {attack.abilityMod}</p>
                <p className="c-atk__drop">Dice: {attack.diceType}</p>
                <p className="c-atk__drop">HitDc: {attack.hitDc}</p>
                <p className="c-atk__drop">Range: {attack.range}</p>
                <p className="c-atk__drop">Type: {attack.type}</p>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
};

export default Attacks;
