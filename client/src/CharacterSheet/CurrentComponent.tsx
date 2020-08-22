import React from 'react';
import { SavingThrows, Skills, Stats, Story, AllActions, Equipment, QuickAccess } from './index';
import { Tabs } from '../ts/interfaces';

interface IProps {
  current: Tabs;
}

const CurrentComponent: React.FC<IProps> = ({ current }) => {
  switch (current) {
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