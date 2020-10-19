import React from 'react';
import UserContextProvider from "../../context/users";

import Calendar from "./Calendar/Calendar";
import Footer from "./Footer/Footer";
import Users from "./Users";

import styles from './calendarPage.module.scss';

const CalendarPage = () => {
  return (
    <div className={styles.calendar}>
      <UserContextProvider>
        <Calendar/>
        <Users/>
      </UserContextProvider>
      <Footer/>
    </div>
  );
}

export default CalendarPage;
//TODO: Animacja po kliknieciu na sheet ze sie pobiera postac