import React, { useContext } from 'react';
import StatButtons from '../../components/StatButtons';
import { characterContext } from '../../context/Character';
import './styles.scss';

const Skills: React.FC = () => {
  const { character } = useContext(characterContext);

  return (
    <div className="c-skills">
      <p className="c-skills__skill">Strength</p>
      <StatButtons fieldName="Athletics" prop={character.Skills.Athletics} propName="Skills.Athletics" />
      <p className="c-skills__skill">Dexterity</p>
      <StatButtons fieldName="Acrobatics" prop={character.Skills.Acrobatics} propName="Skills.Acrobatics" />
      <StatButtons fieldName="Sleight Of Hands" prop={character.Skills.SleightOfHand} propName="Skills.SleightOfHand" />
      <StatButtons fieldName="Stealth" prop={character.Skills.Stealth} propName="Skills.Stealth" />
      <p className="c-skills__skill">Intelligence</p>
      <StatButtons fieldName="Arcana" prop={character.Skills.Arcana} propName="Skills.Arcana" />
      <StatButtons fieldName="History" prop={character.Skills.History} propName="Skills.History" />
      <StatButtons fieldName="Investigation" prop={character.Skills.Invesigation} propName="Skills.Invesigation" />
      <StatButtons fieldName="Nature" prop={character.Skills.Nature} propName="Skills.Nature" />
      <StatButtons fieldName="Religion" prop={character.Skills.Religion} propName="Skills.Religion" />
      <p className="c-skills__skill">Wisdom</p>
      <StatButtons fieldName="Animal Handling" prop={character.Skills.AnimalHandling} propName="Skills.AnimalHandling" />
      <StatButtons fieldName="Insight" prop={character.Skills.Insight} propName="Skills.Insight" />
      <StatButtons fieldName="Medicine" prop={character.Skills.Medicine} propName="Skills.Medicine" />
      <StatButtons fieldName="Perception" prop={character.Skills.Perception} propName="Skills.Perception" />
      <StatButtons fieldName="Survival" prop={character.Skills.Survival} propName="Skills.Survival" />
      <p className="c-skills__skill">Charisma</p>
      <StatButtons fieldName="Deception" prop={character.Skills.Deception} propName="Skills.Deception" />
      <StatButtons fieldName="Intimidation" prop={character.Skills.Intimidation} propName="Skills.Intimidation" />
      <StatButtons fieldName="Performance" prop={character.Skills.Performance} propName="Skills.Performance" />
      <StatButtons fieldName="Persuasion" prop={character.Skills.Persuasion} propName="Skills.Persuasion" />
    </div>
  )
}

export default Skills;