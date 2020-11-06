import React from 'react';
import TextInput from "../../../components/TextInput/TextInput";
import TextArea from "../../../components/TextArea/TextArea";

const Background = () => {
  return (
    <>
      <TextInput label="Name" backgroundProp="name"/>
      <TextInput label="Class" backgroundProp="class"/>
      <TextInput label="Background" backgroundProp="background"/>
      <TextInput label="Alignment" backgroundProp="alignment"/>
      <TextInput label="Race" backgroundProp="race"/>
      <TextArea label="Proficiencies" backgroundProp="proficienciesAndLanguage"/>
      <TextArea label="Features & Traits" backgroundProp="featuresAndTraits"/>
      <TextArea label="Story" backgroundProp="story"/>
    </>
  );
}

export default Background;