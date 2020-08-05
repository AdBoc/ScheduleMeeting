import React from 'react';
import { CharacterInterface } from '../../ts/interfaces';
import StatButtons from '../Reusable/StatButtons';
import { ScheetActions } from './reducer/sheetReducer';

interface IProps {
  character: CharacterInterface;
  dispatch: React.Dispatch<ScheetActions>
}

const Skills: React.FC<IProps> = ({ character, dispatch }) => {
  return (
    <div className="sheet--view--skills">
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Strength</p>
        <StatButtons fieldName="Athletics" prop={character.Skills.Athletics} propName="Skills.Athletics" dispatch={dispatch} />
      </div>
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Dexterity</p>
        <StatButtons fieldName="Acrobatics" prop={character.Skills.Acrobatics} propName="Skills.Acrobatics" dispatch={dispatch} />
        <StatButtons fieldName="SleightOfHands" prop={character.Skills.SleightOfHand} propName="Skills.SleightOfHand" dispatch={dispatch} />
        <StatButtons fieldName="Stealth" prop={character.Skills.Stealth} propName="Skills.Stealth" dispatch={dispatch} />
      </div>
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Intelligence</p>
        <StatButtons fieldName="Arcana" prop={character.Skills.Arcana} propName="Skills.Arcana" dispatch={dispatch} />
        <StatButtons fieldName="History" prop={character.Skills.History} propName="Skills.History" dispatch={dispatch} />
        <StatButtons fieldName="Investigation" prop={character.Skills.Invesigation} propName="Skills.Invesigation" dispatch={dispatch} />
        <StatButtons fieldName="Nature" prop={character.Skills.Nature} propName="Skills.Nature" dispatch={dispatch} />
        <StatButtons fieldName="Religion" prop={character.Skills.Religion} propName="Skills.Religion" dispatch={dispatch} />
      </div>
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Wisdom</p>
        <StatButtons fieldName="Animal Handling" prop={character.Skills.AnimalHandling} propName="Skills.AnimalHandling" dispatch={dispatch} />
        <StatButtons fieldName="Insight" prop={character.Skills.Insight} propName="Skills.Insight" dispatch={dispatch} />
        <StatButtons fieldName="Medicine" prop={character.Skills.Medicine} propName="Skills.Medicine" dispatch={dispatch} />
        <StatButtons fieldName="Perception" prop={character.Skills.Perception} propName="Skills.Perception" dispatch={dispatch} />
        <StatButtons fieldName="Survival" prop={character.Skills.Survival} propName="Skills.Survival" dispatch={dispatch} />
      </div>
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Charisma</p>
        <StatButtons fieldName="Deception" prop={character.Skills.Deception} propName="Skills.Deception" dispatch={dispatch} />
        <StatButtons fieldName="Intimidation" prop={character.Skills.Intimidation} propName="Skills.Intimidation" dispatch={dispatch} />
        <StatButtons fieldName="Performance" prop={character.Skills.Performance} propName="Skills.Performance" dispatch={dispatch} />
        <StatButtons fieldName="Persuasion" prop={character.Skills.Persuasion} propName="Skills.Persuasion" dispatch={dispatch} />
      </div>
    </div>
  )
}

export default Skills;