import React from 'react';
import InputField from '../../components/InputField';
import TextAreaField from '../../components/TextAreaField';
import './styles.scss';

const Story: React.FC = () => {
  return (
    <>
      <InputField fieldName="Name" property="Story.Name" />
      <InputField fieldName="Class" property="Story.Class" />
      <InputField fieldName="Background" property="Story.Background" />
      <InputField fieldName="Alignment" property="Story.Alignment" />
      <InputField fieldName="Race" property="Story.Race" />
      <TextAreaField fieldName="Proficiencies" property="Story.ProficienciesAndLanguage" />
      <TextAreaField fieldName="Features & Traits" property="Story.FeaturesAndTraits" />
      <TextAreaField fieldName="Story" property="Story.Story" />
    </>
  )
};

export default Story;