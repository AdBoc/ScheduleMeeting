import React from 'react';
import {MonthData} from "../../../types";
import Day from "./Day";
import styles from './calendar.module.scss'

interface IProps {
  monthData: MonthData;
}

const daysOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

const SelectedMonth: React.FC<IProps> = ({monthData}) => {
  const {handleSelectAll, handleUnselectAll} = monthData;
  return (
    <>
      <div className={styles.weekGrid}>
        {daysOfWeek.map(day => <p key={day}>{day}</p>)}
      </div>
      <div className={styles.daysGrid}>
        {monthData.daysOfMonth.map(day => <Day key={day} {...monthData} day={day}/>)}
      </div>
      <div className={styles.selectButtons}>
        <button className={styles.selectButton} onClick={handleSelectAll}>Select All</button>
        <button className={styles.selectButton} onClick={handleUnselectAll}>Unselect All</button>
      </div>
    </>
  );
}

export default SelectedMonth;
