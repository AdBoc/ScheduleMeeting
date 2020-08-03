import React from 'react';
import { CharacterInterface } from '../../ts/interfaces';

interface IProps {
  character: CharacterInterface;
}

const Story: React.FC<IProps> = ({ character }) => {

  return (
    <>
      <div className="sheet--view--story">
        <p>Class</p>
        <p>{character.Story.Class}</p>
        <p>Background</p>
        <p>{character.Story.Background}</p>
        <p>XP</p>
        <p>{character.Story.ExperiencePoints}</p>
        <p>Alignment</p>
        <p>{character.Story.Alignment}</p>
        <p>Race</p>
      </div>
      <p>Proficiencies and language</p>
      <p>{character.Story.ProficienciesAndLanguage}</p>
      <p>Features n Traits</p>
      <p>{character.Story.FeaturesAndTraits}</p>
      <p>Story</p>
      <p>{character.Story.Story}</p>
    </>
  )
}

export default Story;