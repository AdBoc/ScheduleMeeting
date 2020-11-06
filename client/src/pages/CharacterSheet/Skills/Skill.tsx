import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {decrementSkill, incrementSkill, tagSkill} from "../../../redux/actions";
import {dndMath} from "../../../utils/dndMath";

import {RootState} from "../../../redux/reducers";
import {Skills} from "../../../redux/types";

import {hpColors} from "../../statsColors";
import styles from "./skills.module.scss";

interface IProps {
  edit: boolean
  skillName: keyof Skills;
  label: string;
}

const Skill: React.FC<IProps> = ({edit, skillName, label}) => {
  const skill = useSelector((state: RootState) => state.skills[skillName]);
  const level = useSelector((state: RootState) => state.characterStats.level);
  const dispatch = useDispatch();

  const skillVal = skill.isTagged ? skill.value + dndMath.skillProficiency(level) : skill.value;

  const handleIncrement = () => dispatch(incrementSkill(skillName))
  const handleDecrement = () => dispatch(decrementSkill(skillName))
  const handleTag = () => dispatch(tagSkill(skillName));

  return (
    <div className={styles.skill}>
      <button className={skill.isTagged ? styles.skillNameTagged : styles.skillName} onClick={edit ? handleTag : undefined}>{label}</button>
      <button className={edit ? styles.skillEditButton : styles.skillEditButtonInvisible} onClick={handleDecrement}>-</button>
      <p className={`${hpColors[skillVal]} ${skill.isTagged ? styles.skillValueTagged : styles.skillValue}`}>{skillVal}</p>
      <button className={edit ? styles.skillEditButton : styles.skillEditButtonInvisible} onClick={handleIncrement}>+</button>
    </div>
  );
}

export default Skill;