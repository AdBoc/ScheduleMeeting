import React from 'react';
import AddAttack from './AddAttack';
import { useExpandableList } from '../../hooks/useExpandableList';
import { Attack } from '../../ts/interfaces';

interface AttackActive extends Attack {
  active: boolean;
};

const Attacks: React.FC = () => {
  const { extItems, extVisible, showDetails, formVisiblity, deleteItem } = useExpandableList("Attacks");

  return (
    <>
      <button className="g-btn" onClick={formVisiblity}>+ Add Attack</button>
      {extVisible && <AddAttack formVisibility={formVisiblity} />}
      <div className="c-list-scroll">
        {extItems.map((attack: AttackActive) => {
          return (
            <div key={attack.id}>
              <div className="c-atk">
                <p className="c-atk__field">{attack.name}</p>
                <p className="c-atk__field">{attack.diceType}</p>
                <p className="c-atk__field">{attack.range}</p>
                <p className="i-expand" onClick={showDetails(attack.id)} />
                <button className="i-trash" name={attack.id} onClick={deleteItem} />
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
    </>
  )
};

export default Attacks;
