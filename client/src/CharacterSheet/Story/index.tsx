import React from 'react';
import InputField from '../../components/InputField';
import TextAreaField from '../../components/TextAreaField';
import './styles.scss';

const Story: React.FC = () => {
  return (
    <>
      <InputField fieldName="Name" property="Name" />
      <InputField fieldName="Class" property="Class" />
      <InputField fieldName="Background" property="Background" />
      <InputField fieldName="Alignment" property="Alignment" />
      <InputField fieldName="Race" property="Race" />
      <TextAreaField fieldName="Proficiencies" property="ProficienciesAndLanguage" />
      <TextAreaField fieldName="Features & Traits" property="FeaturesAndTraits" />
      <TextAreaField fieldName="Story" property="Story" />
    </>
  )
};

export default Story;