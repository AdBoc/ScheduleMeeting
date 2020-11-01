import React from 'react';
import TextInput from "../../../components/TextInput/TextInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import TextArea from "../../../components/TextArea/TextArea";

const Background = () => {
  const background = useSelector((state: RootState) => state.background);
  return (
    <>
      <TextInput label="Name" value={background.Name} path="Background.Name"/>
      <TextInput label="Class" value={background.Class} path="Background.Class"/>
      <TextInput label="Background" value={background.Background} path="Background.Background"/>
      <TextInput label="Alignment" value={background.Alignment} path="Background.Alignment"/>
      <TextInput label="Race" value={background.Race} path="Background.Race"/>
      <TextArea label="Proficiencies" value={background.ProficienciesAndLanguage} path="Background.ProficienciesAndLanguage"/>
      <TextArea label="Features & Traits" value={background.FeaturesAndTraits} path="Background.FeaturesAndTraits"/>
      <TextArea label="Story" value={background.Story} path="Background.Story"/>
    </>
  );
}

export default Background;