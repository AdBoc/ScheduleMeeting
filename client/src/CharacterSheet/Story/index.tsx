import React, {useContext} from 'react';
import {characterContext} from '../../context/Character';
import InputField from '../../components/InputField';
import TextAreaField from '../../components/TextAreaField';
import './styles.scss';

const Story: React.FC = () => {
  const {character} = useContext(characterContext);
  return (
    <>
      <InputField fieldName="Name" prop={character.Story.Name} propPath="Story.Name"/>
      <InputField fieldName="Class" prop={character.Story.Class} propPath="Story.Class"/>
      <InputField fieldName="Background" prop={character.Story.Background} propPath="Story.Background"/>
      <InputField fieldName="Alignment" prop={character.Story.Alignment} propPath="Story.Alignment"/>
      <InputField fieldName="Race" prop={character.Story.Race} propPath="Story.Race"/>
      <TextAreaField fieldName="Proficiencies" prop={character.Story.ProficienciesAndLanguage} propPath="Story.ProficienciesAndLanguage"/>
      <TextAreaField fieldName="Features & Traits" prop={character.Story.FeaturesAndTraits} propPath="Story.FeaturesAndTraits"/>
      <TextAreaField fieldName="Story" prop={character.Story.Story} propPath="Story.Story"/>
    </>
  )
};

export default Story;