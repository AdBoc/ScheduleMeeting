import React, { useContext } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';

const SavingThrows: React.FC = () => {

  const { character, dispatch } = useContext(characterContext);

  const returnModificator = (statValue: number, isTagged: boolean) => {
    if (isTagged) {
      let ProfMod: number;
      if (character.MainStats.Level === 0)
        ProfMod = 2
      else
        ProfMod = Math.floor((character.MainStats.Level - 1) / 4) + 2
      return Math.floor(statValue / 2) - 5 + ProfMod;
    }
    return Math.floor(statValue / 2) - 5;
  };

  const tagElement = ({ target }: any) => {
    const newArr = character.Other.TaggedThrows;
    if (target.name === newArr[0]) {
      newArr[0] = null;
    } else if (target.name === newArr[1]) {
      newArr[1] = null;
    } else {
      newArr.pop();
      newArr.unshift(target.name);
    }
    dispatch({ type: Types.TAG_PROP, payload: { newArray: newArr } });
  };

  const generateSavingThrows = () => {
    let isTagged: boolean;
    return Object.entries(character.Stats).map((stat, index) => {
      isTagged = character.Other.TaggedThrows[0] === stat[0] || character.Other.TaggedThrows[1] === stat[0];
      return (
        <button key={index} name={stat[0]} className={isTagged ? "c-save-throw g-tagged" : "c-save-throw"} onClick={tagElement}>
          {stat[0]} {returnModificator(stat[1], isTagged)}
        </button>
      )
    });
  };

  const countTagged = () => {
    let count = 0;
    if (character.Other.TaggedThrows[0] !== null)
      count++;
    if (character.Other.TaggedThrows[1] !== null)
      count++;
    return count;
  }

  return (
    <>
      <p className="c-save-throws__title">Saving throws</p>
      <div className="c-save-throws">
        {generateSavingThrows()}
      </div>
      <p className="c-save-throws__tag">tagged {countTagged()}/2</p>
      <div className="c-save-death">
        <p className="c-save-death__title">Death save</p>
        <p className="c-save-death__label">Successes</p>
        <input className="c-save-death__checkbox" type="checkbox" />
        <input className="c-save-death__checkbox" type="checkbox" />
        <input className="c-save-death__checkbox" type="checkbox" />
        <p className="c-save-death__label">Failures</p>
        <input className="c-save-death__checkbox" type="checkbox" />
        <input className="c-save-death__checkbox" type="checkbox" />
        <input className="c-save-death__checkbox" type="checkbox" />
      </div>
    </>
  )
};

export default SavingThrows;