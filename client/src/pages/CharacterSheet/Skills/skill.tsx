import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {Character} from "../../../redux/types";
import {dndMath} from "../../../utils/dndMath";
import {decrementStat, incrementStat} from "../../../redux/actions";

interface IProps {
  skillName: keyof Character["Skills"];
}

const Skill: React.FC<IProps> = ({skillName}) => {
  const character = useSelector((state: RootState) => state.characterReducer);
  const dispatch = useDispatch();

  const taggedIndex = character.Other.TaggedSkills.findIndex(skill => skill === skillName);
  const skillVal = taggedIndex === -1 ? character.Skills[skillName] : dndMath.skillProficiency(character.MainStats.Level);

  const handleTag = () => {
    if (taggedIndex !== -1) {

    }
  }

  return (
    <div>
      <button onClick={() => dispatch(incrementStat(`Skills.${skillName}`))}>-</button>
      <button>{skillName}</button>
      <button onClick={() => dispatch(decrementStat(`Skills.${skillName}`))}>+</button>
      <p>{skillVal}</p>
    </div>
  );
}

export default Skill;
//TODO: useMEMo??