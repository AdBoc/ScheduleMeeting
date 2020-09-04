import React, { useState, useContext, useEffect } from 'react';
import { characterContext } from '../context/Character';
import { Tabs } from '../ts/interfaces';
import TopDisplay from './TopDisplay';
import CurrentComponent from './CurrentComponent';
import TabsScroll from './TabsScroll';
import './styles.scss';

const CharacterSheet: React.FC = () => {
  const [currentView, setCurrentView] = useState<Tabs>("stats");
  const { character } = useContext(characterContext);

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(character));
  }, [character]);

  return (
    <>
      <TopDisplay />
      <TabsScroll setCurrentView={setCurrentView} />
      <CurrentComponent current={currentView} />
    </>
  )
};

export default CharacterSheet;
