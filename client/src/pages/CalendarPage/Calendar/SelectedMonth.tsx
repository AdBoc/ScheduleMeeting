import React from 'react';
import {MonthData} from "../../../types";
import Day from "./Day";

interface IProps {
  monthData: MonthData;
}

const daysOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

const SelectedMonth: React.FC<IProps> = ({monthData}) => {
  const {handleSelectAll, handleUnselectAll} = monthData;
  return (
    <>
      <div>
        {daysOfWeek.map(day => <p key={day}>{day}</p>)}
      </div>
      <div>
        {monthData.daysOfMonth.map(day => <Day key={day} {...monthData} day={day}/>)}
      </div>
      <div>
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleUnselectAll}>Unselect</button>
      </div>
    </>
  );
}

export default SelectedMonth;
