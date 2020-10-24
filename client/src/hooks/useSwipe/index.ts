import {useEffect, useState} from "react";

const tabs = ["stats", "skills", "savingThrows", "allActions", "equipment", "background", "quickAccess"];

export const useSwipe = () => {
  const [currentIndex, setCurrentIndex] = useState(6); //TODO: Set on 0
  const [currentTab, setCurrentTab] = useState(tabs[currentIndex]);
  let startX: number;

  useEffect(() => {
    setCurrentTab(tabs[currentIndex]);
  }, [currentIndex]);

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

  return {
    handleTouchStart,
    handleTouchEnd,
    currentTab,
  }
}