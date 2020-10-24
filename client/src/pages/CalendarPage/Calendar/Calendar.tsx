import React, {useContext} from 'react';

import useCalendar from "../../../hooks/useCalendar";
import {userContext} from "../../../context/users";

import MonthLabel from "./MonthLabel";
import SelectedMonth from "./SelectedMonth";

import styles from './calendar.module.scss';
import './calendar.scss';

const Calendar = () => {
  const {user} = useContext(userContext);
  const {monthData, selectedMonth} = useCalendar(user);

  return (
    <div className={styles.calendar}>
      <MonthLabel selectedMonth={selectedMonth}/>
      <SelectedMonth monthData={monthData}/>
    </div>
  );
}

export default Calendar;