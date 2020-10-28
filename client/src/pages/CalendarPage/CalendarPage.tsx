import React from 'react';
import UserContextProvider from "../../context/users";

import Calendar from "./Calendar/Calendar";
import Footer from "./Footer/Footer";
import Users from "./Users";

import styles from './calendarPage.module.scss';

const CalendarPage = () => {
  return (
    <UserContextProvider>
      <div className={styles.calendar}>
        <Calendar/>
        <Users/>
        <Footer/>
      </div>
    </UserContextProvider>
  );
}

export default CalendarPage;
//TODO: Animacja po kliknieciu na sheet ze sie pobiera postac