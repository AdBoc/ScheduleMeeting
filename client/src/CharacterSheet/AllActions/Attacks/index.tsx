import React, { useState, useContext } from 'react';
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';
import { Attack } from '../../../ts/interfaces';

const Attacks: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);
  const [details, setDetails] = useState<Attack | null>(null);

  const deleteItem = ({ target }: any) => dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property: "Attacks", id: target.name } });
  const showDetails = (attack: Attack) => () => {
    if (details) return setDetails(null);
    setDetails(attack);
  };

  return (
    <>
      {character.Attacks.map((attack) => (
        <div key={attack.id} className={`c-atk ${attack.type}`} onClick={showDetails(attack)}>
          <p className="c-atk__field">{attack.name}</p>
          <p>{attack.baseDmg} + {attack.diceType} + {attack.abilityMod}</p>
          <button name={attack.id} onClick={deleteItem}>D</button>
        </div>
      ))}
      {details && <>
        <p className="c-atk__drop">Name: {details.name}</p>
        <p className="c-atk__drop">Ability Mod: {details.abilityMod}</p>
        <p className="c-atk__drop">Dice: {details.diceType}</p>
        <p className="c-atk__drop">Base Dmg: {details.baseDmg}</p>
        <p className="c-atk__drop">Range: {details.range}</p>
        <p className="c-atk__drop">Type: {details.type}</p>
        <button className="c-atk__drop" name={details.id} onClick={deleteItem}>DELETE</button>
      </>
      }
    </>
  )
};

export default Attacks;
