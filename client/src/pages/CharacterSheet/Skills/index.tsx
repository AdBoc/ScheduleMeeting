import React, {useState} from 'react';
import Skill from "./Skill";
import styles from "./skills.module.scss";

const Skills = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={styles.skills}>
      <button className={isEdit ? styles.buttonSelected : styles.button} onClick={() => setIsEdit(prev => !prev)}>EDIT</button>
      <p className={styles.skillLabel}>Strength</p>
      <Skill edit={isEdit} label="Athletics" skillName="athletics"/>
      <p className={styles.skillLabel}>Dexterity</p>
      <Skill edit={isEdit} label="Acrobatics" skillName="acrobatics"/>
      <Skill edit={isEdit} label="Sleight Of Hand" skillName="sleightOfHand"/>
      <Skill edit={isEdit} label="Stealth" skillName="stealth"/>
      <p className={styles.skillLabel}>Intelligence</p>
      <Skill edit={isEdit} label="Arcana" skillName="arcana"/>
      <Skill edit={isEdit} label="History" skillName="history"/>
      <Skill edit={isEdit} label="Investigation" skillName="investigation"/>
      <Skill edit={isEdit} label="Nature" skillName="nature"/>
      <Skill edit={isEdit} label="Religion" skillName="religion"/>
      <p className={styles.skillLabel}>Wisdom</p>
      <Skill edit={isEdit} label="Animal Handling" skillName="animalHandling"/>
      <Skill edit={isEdit} label="Insight" skillName="insight"/>
      <Skill edit={isEdit} label="Medicine" skillName="medicine"/>
      <Skill edit={isEdit} label="Perception" skillName="perception"/>
      <Skill edit={isEdit} label="Survival" skillName="survival"/>
      <p className={styles.skillLabel}>Charisma</p>
      <Skill edit={isEdit} label="Deception" skillName="deception"/>
      <Skill edit={isEdit} label="Intimidation" skillName="intimidation"/>
      <Skill edit={isEdit} label="Performance" skillName="performance"/>
      <Skill edit={isEdit} label="Persuasion" skillName="persuasion"/>
    </div>
  );
}

export default Skills;