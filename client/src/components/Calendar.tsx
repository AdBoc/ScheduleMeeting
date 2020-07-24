import React, { useState } from 'react';
import { CalendarProps, SelectedDays, FilteredAllColors, FilteredByColor, LooseObject } from '../ts/interfaces';

const Calendar: React.FC<CalendarProps> = ({ selectedColor }) => {
  // let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // let day = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
  let selectedDays: SelectedDays = [
    { day: '1', color: "--blue" },
  ];

  const ParseWithColor = (selectedDays: SelectedDays, selectedColor: string) => {
    return selectedDays.filter(item => item.color === selectedColor).reduce((obj: LooseObject, item) => (obj[item.day] = item.color, obj), {});
  };

  const ParseNoColor = (selectedDays: SelectedDays) => {
    return selectedDays.reduce((obj: LooseObject, item) => {
      if (obj[item.day]) {
        obj[item.day].push(item.color);
      } else {
        obj[item.day] = [item.color];
      }
      return obj;
    }, {});
  };

  const daysFilteredByColor = selectedColor ? ParseWithColor(selectedDays, selectedColor) : ParseNoColor(selectedDays); //jak ma drugi arg to dziala inaczej funkcja

  let today = new Date();
  const [currentDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const selectDay = ({ target }: any) => {
    const { value } = target;
    //wysyla date to api i odpalany jest useEffect
    //wysylana jest info o kolorku
  };

  const getCalendar = (month: number, year: number) => {
    // console.log(new Date(year, month, 32).getDay());
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let daysOfMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysOfMonth.push(i.toString());
    };
    if (selectedColor) { //moge typeofem sprawdzac co to za typ
      return (
        <div className="days">
          {daysOfMonth.map((day, index) => {
            return <button className={`day ${day} ` + daysFilteredByColor[day]} value={day} key={index} onClick={selectDay}>{day}</button>
          })}
        </div>
      )
    } else {
      return ( // let value: number;
        <div className="days">
          {daysOfMonth.map((day, index) => {
            let value;
            if (daysFilteredByColor[day] !== undefined)
              value = daysFilteredByColor[day].length;
            return <button className={`day ${day} count${value}`} value={day} key={index} onClick={selectDay}>{day}</button>
          })}
        </div>
      )
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    //getuje od api default selected values, wysylana jest wartosc month
  };

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    //getuje od api default selected values
  };

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
