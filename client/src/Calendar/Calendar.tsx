import React from 'react';

import PlayerContextProvider from "../context/SelectedUser";
import {Footer, Month, Players} from './index';

import './Calendar.scss';

const Calendar: React.FC = () => {
  return (
    <div className="calendar-app">
      <PlayerContextProvider>
        <Month/>
        <Players/>
        <Footer/>
      </PlayerContextProvider>
    </div>
  )
};

export default Calendar;