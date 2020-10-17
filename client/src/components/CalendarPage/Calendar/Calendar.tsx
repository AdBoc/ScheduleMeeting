import React, {useContext} from 'react';

import useCalendar from "../../../hooks/useCalendar";
import {userContext} from "../../../context/users";

import './calendar.scss';

const monthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

const Calendar = () => {
  const {user} = useContext(userContext);
  const {userDate, daysOfMonth, filteredDays, prevMonth, nextMonth, handleSelectDay, isCurrentDay, handleSelectAll, handleUnselectAll} = useCalendar(user);

  return (
    <>
      <div>
        <button onClick={prevMonth}>{"<"}</button>
        <h2>{monthsInYear[userDate.selectedMonth]}</h2>
        <h2>{userDate.selectedYear}</h2>
        <button onClick={nextMonth}>{">"}</button>
      </div>
      <div>
        <div>
          {daysOfWeek.map(day => <p key={day}>{day}</p>)}
        </div>
        <div>
          {user ?
            <>
              {daysOfMonth.map(day =>
                <button
                  key={day}
                  className={`day${(filteredDays[day] && " selected") || ""}`}
                  value={day}
                  onClick={handleSelectDay}>
                  {day}
                </button>)}
            </>
            :
            <>
              {daysOfMonth.map(day =>
                <button
                  key={day}
                  className={`day${(filteredDays[day] && " count" + filteredDays[day].length) || ""}${(isCurrentDay(day) && " today") || ""}`}
                  value={day}
                  onClick={handleSelectDay}>
                  {day}
                </button>)}
            </>
          }
        </div>
        <div>
          <button onClick={handleSelectAll}>Select All</button>
          <button onClick={handleUnselectAll}>Unselect</button>
        </div>
      </div>
    </>
  );
}

export default Calendar;