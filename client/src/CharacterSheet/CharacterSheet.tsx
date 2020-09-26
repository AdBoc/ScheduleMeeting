import React, {useContext, useEffect, useState} from 'react';
import {characterContext} from '../context/Character';
import TopDisplay from './TopDisplay';
import CurrentComponent from './CurrentComponent';
import TabsScroll from './TabsScroll';
import './styles.scss';
import {apiService} from "../Services/FetchAPI";

const CharacterSheet: React.FC = () => {
  const tabs = ["stats", "skills", "savingThrows", "allActions", "equipment", "story", "quickAccess"];
  let startX = 0;

  const {character} = useContext(characterContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentView, setCurrentView] = useState(tabs[currentIndex]);

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(character));
    apiService.sendCharacter();
  }, [character]);

  useEffect(() => {
    setCurrentView(tabs[currentIndex]);
  }, [currentIndex, tabs]);

  const handleTouchStart = (e: any) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    if (e.changedTouches[0].clientX - startX > 100) {
      if (currentIndex === 0) return setCurrentIndex(6);
      setCurrentIndex(prev => prev - 1);
    } else if (e.changedTouches[0].clientX - startX < -100) {
      if (currentIndex === 6) return setCurrentIndex(0);
      setCurrentIndex(prev => prev + 1);
    }
  };

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

export default CharacterSheet;
