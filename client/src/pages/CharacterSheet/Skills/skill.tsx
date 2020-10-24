import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {Character} from "../../../redux/types";
import {dndMath} from "../../../utils/dndMath";
import {decrementStat, incrementStat, setArray} from "../../../redux/actions";
import styles from "./skills.module.scss";

interface IProps {
  skillName: keyof Character["Skills"];
}

const Skill: React.FC<IProps> = ({skillName}) => {
  const character = useSelector((state: RootState) => state.characterReducer);
  const dispatch = useDispatch();

  const taggedIndex = character.Other.TaggedSkills.findIndex(skill => skill === skillName);
  const skillVal = taggedIndex === -1 ? character.Skills[skillName] : character.Skills[skillName] + dndMath.skillProficiency(character.MainStats.Level);

  const handleTag = ({target}: any) => {
    let newTagArr: string[];
    if (taggedIndex === -1) newTagArr = [...character.Other.TaggedSkills, target.name];
    else newTagArr = [...character.Other.TaggedSkills.slice(0, taggedIndex), ...character.Other.TaggedSkills.slice(taggedIndex + 1)];
    dispatch(setArray("Other.TaggedSkills", newTagArr));
  }

  return (
    <div className={styles.skill}>
      {/*<button onClick={() => dispatch(decrementStat(`Skills.${skillName}`))}>-</button>*/}
      <button className={styles.skillName} name={skillName} onClick={handleTag}>{skillName}</button>
      {/*<button onClick={() => dispatch(incrementStat(`Skills.${skillName}`))}>+</button>*/}
      <p>{skillVal}</p>
    </div>
  );
}

export default Skill;
//TODO: useMEMo??