import React, { useContext } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import { CharacterInterface } from '../../ts/interfaces';
import { charMethods } from '../../Services/CharacterMethods';

interface IProps {
  editMode: boolean;
  skillName: keyof CharacterInterface["Skills"];
}

const Skill: React.FC<IProps> = ({ editMode, skillName }) => {
  const { character, dispatch } = useContext(characterContext);

  const handleIncrement = ({ target }: any) => dispatch({ type: Types.INCREMENT_STAT, payload: { property: target.name } });
  const handleDecrement = ({ target }: any) => dispatch({ type: Types.DECREMENT_STAT, payload: { property: target.name } });

  const tagIndex = character.Other.TaggedSkills.findIndex((skill) => skill === skillName);
  const currentValue = tagIndex === -1 ? character.Skills[skillName] : character.Skills[skillName] + charMethods.calcProficiency(character.MainStats.Level);
  
  const handleTag = ({ target }: any) => {
    if (tagIndex !== -1) {
      const newTagArr = [...character.Other.TaggedSkills.slice(0, tagIndex), ...character.Other.TaggedSkills.slice(tagIndex + 1)];
      return dispatch({ type: Types.SET_ARRAY, payload: { property: "Other.TaggedSkills", newArr: newTagArr } });
    }
    dispatch({ type: Types.ADD_TO_ARRAY, payload: { property: "Other.TaggedSkills", newValue: target.name } })
  }

  return (
    <div className={`skills ${tagIndex !== -1 ? "selected" : ""}`}>
      <button className="skills__label" name={skillName} onClick={editMode ? handleTag : undefined}>{skillName}</button>
      {editMode && <button className="skills__plus" name={`Skills.${skillName}`} onClick={handleDecrement}>-</button>}
      <p className="skills__value">{currentValue}</p>
      {editMode && <button className="skills__plus" name={`Skills.${skillName}`} onClick={handleIncrement}>+</button>}
    </div >
  )
}

export default Skill;
