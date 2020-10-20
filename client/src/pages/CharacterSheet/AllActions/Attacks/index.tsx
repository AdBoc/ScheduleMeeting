import React from 'react';
import AddAttack from "./AddAttack";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {dndMath} from "../../../../utils/dndMath";
import {Attack, Character} from "../../../../redux/types";
import {useCustomForm} from "../../../../hooks/useCustomForm";

const Attacks = () => {
  const {showItem, showForm, itemDetails, handleShowItem, handleShowForm} = useCustomForm<Attack>();
  const character = useSelector((state: RootState) => state.characterReducer);
  const attacks = [...character.Attacks];

  return (
    <>
      <button onClick={handleShowForm}>Add attack</button>
      {showForm && <AddAttack/>}
      <div>
        <div>
          <p>Name</p>
          <p>Attack</p>
          <p>Hit</p>
          <p>Range</p>
        </div>
        {attacks.sort((a, b) => a.name.localeCompare(b.name)).map(attack => (
          <div key={attack.id} onClick={handleShowItem(attack)}>
            <p>{attack.name}</p>
            <p>{attack.diceType} + {(dndMath.statModifier(character.Stats[attack.profMod as keyof Character["Stats"]]) + attack.bonusDamage)}</p>
            {attack.proficient ? <p>d20
                + {dndMath.statModifier(character.Stats[attack.profMod as keyof Character["Stats"]]) + dndMath.skillProficiency(character.MainStats.Level) + attack.bonusHit}</p> :
              <p>d20 + {dndMath.statModifier(character.Stats[attack.profMod as keyof Character["Stats"]]) + attack.bonusHit}</p>
            }
            <p>{attack.range}</p>
          </div>
        ))}
        {showItem &&
        <div>
            <p>Name: {itemDetails}</p>
        </div>
        }
      </div>
    </>
  );
}

export default Attacks;