import React, { useContext } from 'react';
import { characterContext } from '../../context/Character';
import { charMethods } from '../../Services/CharacterMethods';
import { Types } from '../../context/Character/reducer';

const ThrowsValues = () => {
  let isTagged: boolean;
  const { character, dispatch } = useContext(characterContext);

  const tagElement = ({ target }: any) => {
    const newArray = character.Other.TaggedThrows;
    if (target.name === newArray[0]) {
      newArray[0] = null;
    } else if (target.name === newArray[1]) {
      newArray[1] = null;
    } else {
      newArray.pop();
      newArray.unshift(target.name);
    }
    dispatch({ type: Types.TAG_PROP, payload: { newArray } });
  };

  return (
    <>
      <p className="c-save-throws__title">Saving throws</p>
      <div className="c-save-throws">
        {
          Object.entries(character.Stats).map((stat, index) => {
            isTagged = character.Other.TaggedThrows[0] === stat[0] || character.Other.TaggedThrows[1] === stat[0];
            return (
              <button key={index} name={stat[0]} className={`c-save-throw ${isTagged ? "g-tagged" : ""}`} onClick={tagElement}>
                {stat[0]} {charMethods.calcSavingThrowMod(character.MainStats.Level, stat[1], isTagged)}
              </button>
            )
          })
        }
      </div>
      <p className="c-save-throws__tag">tagged {charMethods.countTaggedThrows(character.Other.TaggedThrows)}/2</p>
    </>
  )
}

export default ThrowsValues;
