import React from 'react';
import { CharacterInterface } from '../../ts/interfaces';

interface IProps {
  character: CharacterInterface
}

const Skills: React.FC<IProps> = ({ character }) => {
  return (
    <div className="sheet--view--skills">
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Strength</p>
        <div className="sheet--view--skills--section--skill">
          <p>Athletics</p>
          <p>{character.Skills.Athletics}</p>
        </div>
      </div>
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Dexterity</p>
        <div className="sheet--view--skills--section--skill">
          <p>Acrobatics</p>
          <p>{character.Skills.Acrobatics}</p>
        </div>
        <div className="sheet--view--skills--section--skill">
          <p>Sleight of hands</p>
          <p>{character.Skills.SleightOfHand}</p>
        </div>
        <div className="sheet--view--skills--section--skill">
          <p>Stealth</p>
          <p>{character.Skills.Stealth}</p>
        </div>
      </div>
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Intelligence</p>
        <div>
          <div className="sheet--view--skills--section--skill">
            <p>Arcana</p>
            <p>{character.Skills.Arcana}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>History</p>
            <p>{character.Skills.History}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Investigation</p>
            <p>{character.Skills.Invesigation}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Nature</p>
            <p>{character.Skills.Nature}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Religion</p>
            <p>{character.Skills.Religion}</p>
          </div>
        </div>
      </div>
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Wisdom</p>
        <div>
          <div className="sheet--view--skills--section--skill">
            <p>Animal handling</p>
            <p>{character.Skills.AnimalHandling}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Insight</p>
            <p>{character.Skills.Insight}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Medicine</p>
            <p>{character.Skills.Medicine}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Perception</p>
            <p>{character.Skills.Perception}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Survival</p>
            <p>{character.Skills.Survival}</p>
          </div>
        </div>
      </div>
      <div className="sheet--view--skills--section">
        <p className="sheet--view--skills--section--title">Charisma</p>
        <div>
          <div className="sheet--view--skills--section--skill">
            <p>Deception</p>
            <p>{character.Skills.Deception}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Intimidation</p>
            <p>{character.Skills.Initimidation}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Performance</p>
            <p>{character.Skills.Performance}</p>
          </div>
          <div className="sheet--view--skills--section--skill">
            <p>Persuasion</p>
            <p>{character.Skills.Persuasion}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills;