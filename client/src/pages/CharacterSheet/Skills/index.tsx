import React, {useState} from 'react';
import Skill from "./skill";

const Skills = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      <button onClick={() => setIsEdit(prev => !prev)}>EDIT</button>
      <button>RESET</button>
      <p>Strength</p>
      <Skill skillName="Athletics"/>
      <p>Dexterity</p>
      <Skill skillName="Acrobatics"/>
      <Skill skillName="SleightOfHand"/>
      <Skill skillName="Stealth"/>
      <p>Intelligence</p>
      <Skill skillName="Arcana"/>
      <Skill skillName="History"/>
      <Skill skillName="Investigation"/>
      <Skill skillName="Nature"/>
      <Skill skillName="Religion"/>
      <p>Wisdom</p>
      <Skill skillName="AnimalHandling"/>
      <Skill skillName="Insight"/>
      <Skill skillName="Medicine"/>
      <Skill skillName="Perception"/>
      <Skill skillName="Survival"/>
      <p>Charisma</p>
      <Skill skillName="Deception"/>
      <Skill skillName="Intimidation"/>
      <Skill skillName="Performance"/>
      <Skill skillName="Persuasion"/>
    </div>
  );
}

export default Skills;