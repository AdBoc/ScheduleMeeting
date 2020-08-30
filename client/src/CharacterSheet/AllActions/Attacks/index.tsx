import React, { useState, useContext } from 'react';
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';
import { Attack, CharacterInterface } from '../../../ts/interfaces';
import { charMethods } from '../../../Services/CharacterMethods';

const Attacks: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);
  const [details, setDetails] = useState<Attack | null>(null);

  const deleteItem = ({ target }: any) => {
    dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property: "Attacks", id: target.name } });
    setDetails(null);
  };
  const showDetails = (attack: Attack) => () => {
    if (details) return setDetails(null);
    setDetails(attack);
  };

  return (
    <>
      {character.Attacks.map((attack) => (
        <div key={attack.id} className={`c-atk ${attack.type}`} onClick={showDetails(attack)}>
          <p className="c-atk__field">{attack.name}</p>
          {attack.proficient ? <p>{charMethods.calcStatModificator(character.Stats[attack.profMod as keyof CharacterInterface["Stats"]])}</p> :
            <p>{charMethods.calcStatModificator(character.Stats[attack.profMod as keyof CharacterInterface["Stats"]]) + charMethods.calcProficiency(character.MainStats.Level)}</p>}
          <p>+{attack.diceType}</p>
          <p>+{attack.bonusDamage}</p>
        </div>
      ))}
      {details &&
        <div className="details">
          <p className="details__text">Name: {details.name}</p>
          <p className="details__text">Ability Mod: {details.profMod}</p>
          <p className="details__text">Dice: {details.diceType}</p>
          <p className="details__text">Bonus: {details.bonusDamage}</p>
          <p className="details__text">Range: {details.range}</p>
          <p className="details__text">Type: {details.type}</p>
          <button className="details__text" name={details.id} onClick={deleteItem}>DELETE</button>
        </div>
      }
    </>
  )
};

export default Attacks;
