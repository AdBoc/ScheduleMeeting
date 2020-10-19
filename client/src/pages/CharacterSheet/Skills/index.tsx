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
      <p>Intelligence</p>
      <p>Wisdom</p>
      <p>Charisma</p>
    </div>
  );
}

export default Skills;