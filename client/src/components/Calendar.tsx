import React, { useState } from 'react';
import { CalendarProps, SelectedDays } from '../ts/interfaces';

const Calendar: React.FC<CalendarProps> = ({ selectedColor }) => {
  let selectedDays: SelectedDays = [
    { day: '1', color: "--blue" },
    { day: '2', color: "--blue" },
    { day: '2', color: "--red" },
    { day: '6', color: "--blue" }
  ];

  const daysFilteredByColor = selectedColor ? selectedDays.filter(item => item.color === selectedColor) : selectedDays;

  let today = new Date();
  const [currentDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const selectDay = ({ target }: any) => {
    const { value } = target;
    //wysyla date to api i odpalany jest useEffect
    //wysylana jest info o kolorku
  }

  const getCalendar = (month: number, year: number) => {
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let daysOfMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysOfMonth.push(i.toString());
    }

    return (
      <div className="days">
        {
          daysOfMonth.map((day, index) => {
            let className = '';
            daysFilteredByColor.forEach((value) => {
              if (value.day === day)
                className = className + ' ' + value.color;
            });
            return <button className={`day ${day}${className}`} value={day} key={index} onClick={selectDay}>{day}</button>
          })
        }
      </div>
    )
  }

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    //getuje od api default selected values
  }

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    //getuje od api default selected values
  }

  return (
    <>
      <div className="CalendarFlex">
        <p className="top">{"<<"}</p>
        <p className="top" onClick={prevMonth}>{"<"}</p>
        <p className="top">{currentDay + "." + currentMonth + "." + currentYear}</p>
        <p className="top" onClick={nextMonth}>{">"}</p>
        <p className="top">{">>"}</p>
      </div>
      <div className="CalendarFlex">
        <p className="top">SUN</p>
        <p className="top">MON</p>
        <p className="top">TUE</p>
        <p className="top">WED</p>
        <p className="top">THU</p>
        <p className="top">FRI</p>
        <p className="top">SAT</p>
      </div>
      {getCalendar(currentMonth, currentYear)}
    </>
  );
};

export default Calendar;
