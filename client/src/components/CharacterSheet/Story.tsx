import React from 'react';
import { CharacterInterface } from '../../ts/interfaces';
import { ScheetActions, Types } from './reducer/sheetReducer';

interface IProps {
  character: CharacterInterface;
  dispatch: React.Dispatch<ScheetActions>;
};

const Story: React.FC<IProps> = ({ character, dispatch }) => {

  const handleText = ({ target }: any) => {
    dispatch({ type: Types.EDIT_TEXT, payload: { property: target.name, newValue: target.value } });
  };

  return (
    <>
      <div className="sheet--view--story">
        <p>Class</p>
        <textarea name="Class" value={character.Story.Class} onChange={handleText} />
        <p>Background</p>
        <textarea name="Background" value={character.Story.Background} onChange={handleText} />
        <p>Alignment</p>
        <textarea name="Alignment" value={character.Story.Alignment} onChange={handleText} />
        <p>Race</p>
        <textarea name="Race" value={character.Story.Race} onChange={handleText} />
      </div>
      <p>Proficiencies and language</p>
      <textarea name="ProficienciesAndLanguage" value={character.Story.ProficienciesAndLanguage} onChange={handleText} />
      <p>Features n Traits</p>
      <textarea name="FeaturesAndTraits" value={character.Story.FeaturesAndTraits} onChange={handleText} />
      <p>Story</p>
      <textarea name="Story" value={character.Story.Story} onChange={handleText} />
    </>
  )
};

export default Story;