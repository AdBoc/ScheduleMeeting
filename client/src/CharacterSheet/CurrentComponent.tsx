import React, { useContext } from 'react';
import { SavingThrows, Skills, Stats, Story, AllActions, Equipment, QuickAccess } from './index';
import { tabContext } from '../context/TabView';


const CurrentComponent: React.FC = () => {
  const { currentView } = useContext(tabContext);
  switch (currentView) {
    case 'stats':
      return <Stats />
    case 'skills':
      return <Skills />
    case 'savingThrows':
      return <SavingThrows />
    case 'allActions':
      return <AllActions />
    case 'equipment':
      return <Equipment />
    case 'story':
      return <Story />
    case 'quickAccess':
      return <QuickAccess />
    default:
      return null;
  };
}

export default CurrentComponent;