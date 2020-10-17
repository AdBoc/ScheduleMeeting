import React from 'react';
import {UserDate} from "../../../types";

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
    <>
      <div>
        <button onClick={prevMonth}>{"<"}</button>
        <h2>{monthsInYear[userDate.selectedMonth]}</h2>
        <h2>{userDate.selectedYear}</h2>
        <button onClick={nextMonth}>{">"}</button>
      </div>
    </>
  );
}

export default MonthLabel;