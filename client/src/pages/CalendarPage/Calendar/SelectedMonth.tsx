import React from 'react';
import {MonthData} from "../../../types";
import Day from "./Day";
import styles from './calendar.module.scss'

interface IProps {
  monthData: MonthData;
}

const daysOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

const SelectedMonth: React.FC<IProps> = ({monthData}) => {
  const {handleSelectAll, handleUnselectAll, isFetching, emptyDaysCount} = monthData;

  const emptyDays: JSX.Element[] = []
  for (let i = 0; i < emptyDaysCount; i++) {
    emptyDays.push(<button key={i} className={styles.emptyDay}/>)
  }

  return (
    <>
      <div className={styles.weekGrid}>
        {daysOfWeek.map(day => <p key={day}>{day}</p>)}
      </div>
      {isFetching && <div className={styles.loadingMessage}>...Loading</div>}
      <div className={styles.daysGrid}>
        {emptyDays}
        {monthData.daysOfMonth.map(day => <Day key={day} {...monthData} day={day}/>)}
      </div>
      <div className={styles.selectAllButtons}>
        <button className={styles.selectAllButton} onClick={handleSelectAll}>Select All</button>
        <button className={styles.selectAllButton} onClick={handleUnselectAll}>Unselect All</button>
      </div>
    </>
  );
}

export default SelectedMonth;
