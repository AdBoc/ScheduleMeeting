import React from 'react';
import {UserDate} from "../../../types";
import styles from './calendar.module.scss';
import {ChevronLeft, ChevronRight} from '../../../assets/GitSvg';

const monthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface IProps {
  selectedMonth: {
    prevMonth: () => void;
    userDate: UserDate;
    nextMonth: () => void;
  };
}

const MonthLabel: React.FC<IProps> = ({selectedMonth}) => {
  const {prevMonth, userDate, nextMonth} = selectedMonth;
  return (
    <div className={styles.monthTop}>
      <ChevronLeft cssClass={styles.topButton} handleClick={prevMonth}/>
      <h2 className={styles.topLabel}>{monthsInYear[userDate.selectedMonth]} {userDate.selectedYear}</h2>
      <ChevronRight cssClass={styles.topButton} handleClick={nextMonth}/>
    </div>
  );
}

export default MonthLabel;