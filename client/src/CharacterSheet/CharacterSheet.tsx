import React, {useContext, useEffect} from 'react';

import {apiService} from "../Services/FetchAPI";
import {useSwipe} from "../hooks/useSwipe";
import {characterContext} from '../context/Character';

import CurrentComponent from './CurrentComponent';
import TabsScroll from './TabsScroll';
import TopDisplay from './TopDisplay';

import './styles.scss';

const CharacterSheet: React.FC = () => {
  const {character} = useContext(characterContext);
  const {currentView, setCurrentIndex, handleTouchStart, handleTouchEnd} = useSwipe()

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(character));
    apiService.sendCharacter();
  }, [character]);

  return (
    <div className="try-flex">
      <TopDisplay/>
      <TabsScroll setCurrentIndex={setCurrentIndex}/>
      <div className="flex-content" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <CurrentComponent currentView={currentView}/>
      </div>
    </div>
  )
};
//TODO: HOC or change switch in CurrentComponent
export default CharacterSheet;
