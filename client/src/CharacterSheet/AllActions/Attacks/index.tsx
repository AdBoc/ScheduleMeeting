import React, { useState, useContext, useEffect, useRef } from 'react';
import { characterContext } from '../../../context/Character';
import { Types } from '../../../context/Character/reducer';
import { Attack, CharacterInterface } from '../../../ts/interfaces';
import { charMethods } from '../../../Services/CharacterMethods';
import useOutsideClick from '../../../hooks/useOutsideClick';

const Attacks: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);
  const [attacks, setAttacks] = useState(character.Attacks);
  const [details, setDetails] = useState<Attack | null>(null);

  const ref = useRef(null);
  useOutsideClick(ref, () => { if (details) setDetails(null) });

  useEffect(() => {
    setAttacks(character.Attacks);
  }, [character.Attacks]);

  const deleteItem = ({ target }: any) => {
    dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property: "Attacks", id: target.name } });
    setDetails(null);
  };
  const showDetails = (attack: Attack) => () => {
    setDetails(attack);
  };

  return (
    <>
      <>
        <div className="grid-border attacks-grid">
          <p>Name</p>
          <p>Attack</p>
          <p>Hit</p>
          <p>Range</p>
        </div>
        {attacks.sort((a, b) => a.name.localeCompare(b.name)).map((attack) => (
          <div key={attack.id} className={`attacks-grid ${attack.type}`} onClick={showDetails(attack)}>
            <p>{attack.name}</p>
            {attack.proficient ? <p> {attack.diceType + (charMethods.calcStatModificator(character.Stats[attack.profMod as keyof CharacterInterface["Stats"]]) + +attack.bonusDamage)}</p> :
              <p>{attack.diceType + (charMethods.calcStatModificator(character.Stats[attack.profMod as keyof CharacterInterface["Stats"]]) + charMethods.calcProficiency(character.MainStats.Level) + +attack.bonusDamage)}</p>}
            {attack.proficient ? <p>d20 + {charMethods.calcStatModificator(character.Stats[attack.profMod as keyof CharacterInterface["Stats"]]) + +attack.bonusHit}</p> :
              <p>d20 + {charMethods.calcStatModificator(character.Stats[attack.profMod as keyof CharacterInterface["Stats"]]) + charMethods.calcProficiency(character.MainStats.Level) + +attack.bonusHit}</p>}
            <p>{attack.range}</p>
          </div>
        ))}
      </>
      {details &&
        <div className="details" ref={ref}>
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
