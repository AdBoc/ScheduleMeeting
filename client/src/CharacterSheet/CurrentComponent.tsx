import React from 'react';
import { SavingThrows, Skills, Stats, Story, AllActions, Equipment, QuickAccess } from './index';

interface IProps {
  currentView: string;
}

const CurrentComponent: React.FC<IProps> = ({ currentView }) => {
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