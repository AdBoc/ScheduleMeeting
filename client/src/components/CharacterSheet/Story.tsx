import React from 'react';
import InputField from '../Reusable/InputField';
import TextAreaField from '../Reusable/TextArea';

const Story: React.FC = () => {

  return (
    <>
      <InputField fieldName="Name" property="Name" />
      <InputField fieldName="Class" property="Class" />
      <InputField fieldName="Background" property="Background" />
      <InputField fieldName="Alignment" property="Alignment" />
      <InputField fieldName="Race" property="Race" />
      <TextAreaField fieldName="ProficienciesAndLanguage" property="ProficienciesAndLanguage" />
      <TextAreaField fieldName="FeaturesAndTraits" property="FeaturesAndTraits" />
      <TextAreaField fieldName="Story" property="Story" />
    </>
  )
};

export default Story;