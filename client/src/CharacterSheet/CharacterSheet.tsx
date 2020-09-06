import React, { useContext, useEffect } from 'react';
import { characterContext } from '../context/Character';
import TopDisplay from './TopDisplay';
import CurrentComponent from './CurrentComponent';
import TabsScroll from './TabsScroll';
import './styles.scss';

const CharacterSheet: React.FC = () => {
  const { character } = useContext(characterContext);

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(character));
  }, [character]);

  return (
    <>
      <TopDisplay />
      <TabsScroll />
      <CurrentComponent />
    </>
  )
};

export default CharacterSheet;
