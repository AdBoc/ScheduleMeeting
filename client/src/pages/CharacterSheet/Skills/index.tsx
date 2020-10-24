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
      <Skill skillName="Athletics"/>
      <p className={styles.skillLabel}>Dexterity</p>
      <Skill skillName="Acrobatics"/>
      <Skill skillName="SleightOfHand"/>
      <Skill skillName="Stealth"/>
      <p className={styles.skillLabel}>Intelligence</p>
      <Skill skillName="Arcana"/>
      <Skill skillName="History"/>
      <Skill skillName="Investigation"/>
      <Skill skillName="Nature"/>
      <Skill skillName="Religion"/>
      <p className={styles.skillLabel}>Wisdom</p>
      <Skill skillName="AnimalHandling"/>
      <Skill skillName="Insight"/>
      <Skill skillName="Medicine"/>
      <Skill skillName="Perception"/>
      <Skill skillName="Survival"/>
      <p className={styles.skillLabel}>Charisma</p>
      <Skill skillName="Deception"/>
      <Skill skillName="Intimidation"/>
      <Skill skillName="Performance"/>
      <Skill skillName="Persuasion"/>
    </div>
  );
}

export default Skills;