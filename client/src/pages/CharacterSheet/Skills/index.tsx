import React, {useState} from 'react';
import Skill from "./skill";
import styles from "./skills.module.scss";

const Skills = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={styles.skills}>
      <button className={isEdit ? styles.buttonSelected : styles.button} onClick={() => setIsEdit(prev => !prev)}>EDIT</button>
      <p className={styles.skillLabel}>Strength</p>
      <Skill edit={isEdit} label="Athletics" skillName="Athletics"/>
      <p className={styles.skillLabel}>Dexterity</p>
      <Skill edit={isEdit} label="Acrobatics" skillName="Acrobatics"/>
      <Skill edit={isEdit} label="Sleight Of Hand" skillName="SleightOfHand"/>
      <Skill edit={isEdit} label="Stealth" skillName="Stealth"/>
      <p className={styles.skillLabel}>Intelligence</p>
      <Skill edit={isEdit} label="Arcana" skillName="Arcana"/>
      <Skill edit={isEdit} label="History" skillName="History"/>
      <Skill edit={isEdit} label="Investigation" skillName="Investigation"/>
      <Skill edit={isEdit} label="Nature" skillName="Nature"/>
      <Skill edit={isEdit} label="Religion" skillName="Religion"/>
      <p className={styles.skillLabel}>Wisdom</p>
      <Skill edit={isEdit} label="Animal Handling" skillName="AnimalHandling"/>
      <Skill edit={isEdit} label="Insight" skillName="Insight"/>
      <Skill edit={isEdit} label="Medicine" skillName="Medicine"/>
      <Skill edit={isEdit} label="Perception" skillName="Perception"/>
      <Skill edit={isEdit} label="Survival" skillName="Survival"/>
      <p className={styles.skillLabel}>Charisma</p>
      <Skill edit={isEdit} label="Deception" skillName="Deception"/>
      <Skill edit={isEdit} label="Intimidation" skillName="Intimidation"/>
      <Skill edit={isEdit} label="Performance" skillName="Performance"/>
      <Skill edit={isEdit} label="Persuasion" skillName="Persuasion"/>
    </div>
  );
}

export default Skills;