import React, { useContext } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import { charMethods } from '../../Services/CharacterMethods';

const SavingThrows: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);

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
          {stat[0]} <span className="c-save-throw__val">{charMethods.calcSavingThrowMod(character.MainStats.Level, stat[1], isTagged)}</span>
        </button>
      )
    });
  };

  return (
    <>
      <p className="c-save-throws__title">Saving throws</p>
      <div className="c-save-throws">
        {generateSavingThrows()}
      </div>
      <p className="c-save-throws__tag">tagged {charMethods.countTaggedThrows(character.Other.TaggedThrows)}/2</p>
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