import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {Character} from "../../../redux/types";
import {dndMath} from "../../../utils/dndMath";
import {decrementStat, incrementStat, setArray} from "../../../redux/actions";
import styles from "./skills.module.scss";

interface IProps {
  edit: boolean
  skillName: keyof Character["Skills"];
  label: string;
}

const hpColors: any = {
  "-5": styles.veyLowStat,
  "-4": styles.veyLowStat,
  "-3": styles.negativeStat,
  "-2": styles.negativeStat,
  "-1": styles.negativeStat,
  0: styles.neutralStat,
  1: styles.positiveStat,
  2: styles.positiveStat,
  3: styles.positiveStat,
  4: styles.veryHighStat,
  5: styles.veryHighStat,
}

const Skill: React.FC<IProps> = ({edit, skillName, label}) => {
  const skill = useSelector((state: RootState) => state.character.Skills[skillName]);
  const taggedSkills = useSelector((state: RootState) => state.character.Other.TaggedSkills);
  const level = useSelector((state: RootState) => state.character.MainStats.Level)
  const dispatch = useDispatch();

  const taggedIndex = taggedSkills.findIndex(skill => skill === skillName);
  const skillVal = taggedIndex === -1 ? skill : skill + dndMath.skillProficiency(level);

  const handleIncrement = () => {
    if (skill === 5) return;
    dispatch(incrementStat(`Skills.${skillName}`))
  }
  const handleDecrement = () => {
    if (skill === -5) return;
    dispatch(decrementStat(`Skills.${skillName}`))
  }

  const handleTag = ({target}: any) => {
    let newTagArr: string[];
    if (taggedIndex === -1) newTagArr = [...taggedSkills, target.name];
    else newTagArr = [...taggedSkills.slice(0, taggedIndex), ...taggedSkills.slice(taggedIndex + 1)];
    dispatch(setArray("Other.TaggedSkills", newTagArr));
  }

  return (
    <div className={styles.skill}>
      <button className={taggedIndex !== -1 ? styles.skillNameTagged : styles.skillName} name={skillName}
              onClick={edit ? handleTag : undefined}>{label}</button>
      <button className={edit ? styles.skillEditButton : styles.skillEditButtonInvisible} onClick={handleDecrement}>-</button>
      <p className={`${hpColors[skillVal]} ${taggedIndex !== -1 ? styles.skillValueTagged : styles.skillValue}`}>{skillVal}</p>
      <button className={edit ? styles.skillEditButton : styles.skillEditButtonInvisible} onClick={handleIncrement}>+</button>
    </div>
  );
}

export default Skill;