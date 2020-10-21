import React from 'react';
import AddAttack from "./AddAttack";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {dndMath} from "../../../../utils/dndMath";
import {Attack, Character} from "../../../../redux/types";
import {useCustomForm} from "../../../../hooks/useCustomForm";
import {deleteInArray} from "../../../../redux/actions";

const Attacks = () => {
  const {showForm, itemDetails, handleShowItem, handleShowForm, handleHideItem} = useCustomForm<Attack>();
  const character = useSelector((state: RootState) => state.characterReducer);
  const dispatch = useDispatch();
  const attacks = [...character.Attacks]; //useEffect

  const handleDelete = () => {
    handleHideItem();
    dispatch(deleteInArray("Attacks", itemDetails!.id));
  }

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
        {itemDetails &&
        <div>
            <p>Name: {itemDetails.name}</p>
            <p className="details__text">Ability Mod: {itemDetails.profMod}</p>
            <p className="details__text">Dice: {itemDetails.diceType}</p>
            <p className="details__text">Bonus: {itemDetails.bonusDamage}</p>
            <p className="details__text">Range: {itemDetails.range}</p>
            <p className="details__text">Type: {itemDetails.type}</p>
            <button className="details__text" name={itemDetails.id} onClick={handleDelete}>DELETE</button>
        </div>
        }
      </div>
    </>
  );
}

export default Attacks;