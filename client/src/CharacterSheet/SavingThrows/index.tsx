import React, { useContext, useState } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import { charMethods } from '../../Services/CharacterMethods';

const SavingThrows: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);
  const [throws, setThrows] = useState([false, false, false, false, false, false]);

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

  const generateSavingThrows = () => {
    let isTagged: boolean;
    return Object.entries(character.Stats).map((stat, index) => {
      isTagged = character.Other.TaggedThrows[0] === stat[0] || character.Other.TaggedThrows[1] === stat[0];
      return (
        <button key={index} name={stat[0]} className={isTagged ? "c-save-throw g-tagged" : "c-save-throw"} onClick={tagElement}>
          {stat[0]} {charMethods.calcSavingThrowMod(character.MainStats.Level, stat[1], isTagged)}
        </button>
      )
    });
  };

  const handleThrows = ({ target }: any) => {
    const newThrows = throws.slice(0);
    newThrows[target.name] = !newThrows[target.name];
    setThrows(newThrows);
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
        <button className={throws[0] ? "c-checkbox --success" : "c-checkbox"} name="0" onClick={handleThrows} />
        <button className={throws[1] ? "c-checkbox --success" : "c-checkbox"} name="1" onClick={handleThrows} />
        <button className={throws[2] ? "c-checkbox --success" : "c-checkbox"} name="2" onClick={handleThrows} />
        <p className="c-save-death__label">Failures</p>
        <button className={throws[3] ? "c-checkbox --fail" : "c-checkbox"} name="3" onClick={handleThrows} />
        <button className={throws[4] ? "c-checkbox --fail" : "c-checkbox"} name="4" onClick={handleThrows} />
        <button className={throws[5] ? "c-checkbox --fail" : "c-checkbox"} name="5" onClick={handleThrows} />
      </div>
    </>
  )
};

export default SavingThrows;