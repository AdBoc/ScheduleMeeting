import React, {useState} from 'react';
import Skill from "./skill";
import styles from "./skills.module.scss";

const Skills = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={styles.skills}>
      <button className={styles.button} onClick={() => setIsEdit(prev => !prev)}>EDIT</button>
      <button className={styles.button}>RESET</button>
      <p className={styles.skillLabel}>Strength</p>
      <Skill label="Athletics" skillName="Athletics"/>
      <p className={styles.skillLabel}>Dexterity</p>
      <Skill label="Acrobatics" skillName="Acrobatics"/>
      <Skill label="Sleight Of Hand" skillName="SleightOfHand"/>
      <Skill label="Stealth" skillName="Stealth"/>
      <p className={styles.skillLabel}>Intelligence</p>
      <Skill label="Arcana" skillName="Arcana"/>
      <Skill label="History" skillName="History"/>
      <Skill label="Investigation" skillName="Investigation"/>
      <Skill label="Nature" skillName="Nature"/>
      <Skill label="Religion" skillName="Religion"/>
      <p className={styles.skillLabel}>Wisdom</p>
      <Skill label="Animal Handling" skillName="AnimalHandling"/>
      <Skill label="Insight" skillName="Insight"/>
      <Skill label="Medicine" skillName="Medicine"/>
      <Skill label="Perception" skillName="Perception"/>
      <Skill label="Survival" skillName="Survival"/>
      <p className={styles.skillLabel}>Charisma</p>
      <Skill label="Deception" skillName="Deception"/>
      <Skill label="Intimidation" skillName="Intimidation"/>
      <Skill label="Performance" skillName="Performance"/>
      <Skill label="Persuasion" skillName="Persuasion"/>
    </div>
  );
}

export default Skills;