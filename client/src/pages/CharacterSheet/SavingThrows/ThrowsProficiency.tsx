import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";
import {tagElement} from "../../../redux/actions";

const ThrowsProficiency = () => {
  const character = useSelector((state: RootState) => state.characterReducer);
  const dispatch = useDispatch();

  return (
    <>
      <p>Saving Throws</p>
      <div>
        {Object.entries(character.Stats).map((stat, i) => (
            <button key={i} name={stat[0]} onClick={({target}: any) => {
              dispatch(tagElement(target.name))
            }}>
              {stat[0]} {dndMath.savingThrowProficiency(character.MainStats.Level, stat[1], character.Other.TaggedThrows.includes(stat[0]))}
            </button>
          )
        )}
      </div>
    </>
  );
}

export default ThrowsProficiency;