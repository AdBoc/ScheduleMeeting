import React, { useState } from 'react';
import './styles.scss';
import Skill from './Skill';

const Skills: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => setIsEdit(prev => !prev); // calculate new data when changing main stat (str)

  return (
    <div className="c-skills">
      <button className="c-skills__edit" onClick={handleEdit}>EDIT</button>
      <p className="c-skills__skill">Strength</p>
      <Skill editMode={isEdit} skillName="Athletics" />
      <p className="c-skills__skill">Dexterity</p>
      <Skill editMode={isEdit} skillName="Acrobatics" />
      <Skill editMode={isEdit} skillName="SleightOfHand" />
      <Skill editMode={isEdit} skillName="Stealth" />
      <p className="c-skills__skill">Intelligence</p>
      <Skill editMode={isEdit} skillName="Arcana" />
      <Skill editMode={isEdit} skillName="History" />
      <Skill editMode={isEdit} skillName="Invesigation" />
      <Skill editMode={isEdit} skillName="Nature" />
      <Skill editMode={isEdit} skillName="Religion" />
      <p className="c-skills__skill">Wisdom</p>
      <Skill editMode={isEdit} skillName="AnimalHandling" />
      <Skill editMode={isEdit} skillName="Insight" />
      <Skill editMode={isEdit} skillName="Medicine" />
      <Skill editMode={isEdit} skillName="Perception" />
      <Skill editMode={isEdit} skillName="Survival" />
      <p className="c-skills__skill">Charisma</p>
      <Skill editMode={isEdit} skillName="Deception" />
      <Skill editMode={isEdit} skillName="Intimidation" />
      <Skill editMode={isEdit} skillName="Performance" />
      <Skill editMode={isEdit} skillName="Persuasion" />
    </div>
  )
}

export default Skills;
