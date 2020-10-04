import {useEffect, useState} from "react";

export const useSwipe = () => {
  const tabs = ["stats", "skills", "savingThrows", "allActions", "equipment", "story", "quickAccess"];
  let startX = 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentView, setCurrentView] = useState(tabs[currentIndex]);

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

  return {
    handleTouchStart,
    handleTouchEnd,
    currentView,
    setCurrentIndex
  }
}