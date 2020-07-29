import React, { useState, useEffect } from 'react';
import { CalendarProps, SelectedDays, FilteredAllColors, FilteredByColor, LooseObject } from '../ts/interfaces';
import { apiService } from '../helpers/ApiService';

const Calendar: React.FC<CalendarProps> = ({ selectedColor }) => {

  let today = new Date();
  const [currentDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDays, setSelectedDays] = useState<never | SelectedDays>([]);

  useEffect(() => { //dodac zapamietywanie miesiaca pomiedzy renderami albo nowy request po kliknieciu 
    const fetchData = async () => {
      const response = await apiService.getSelectedMonthData(currentMonth + "/" + currentYear);
      setSelectedDays(response.daysData);
    };

    fetchData();
  }, [currentMonth]);

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

  const selectDay = ({ target }: any) => {
    const { value, className } = target;
    const isUndefined = /\b(\undefined)$/.test(className) //  \b(\w+)$
    let response;
    if (selectedColor) {
      response = isUndefined ? apiService.addSelectedDay(currentMonth + "/" + currentYear, value, selectedColor) :
        apiService.unselectDay(currentMonth + "/" + currentYear, value, selectedColor)
    }
  };

  const getCalendar = (month: number, year: number) => {
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    const daysOfMonth = [];
    const firstDay = new Date(currentMonth + "/1/" + currentYear).getDay(); //ktora pozycja w gridzie

    for (let i = 1; i <= daysInMonth; i++) {
      daysOfMonth.push(i.toString());
    };

    if (selectedColor) { //moge typeofem sprawdzac co to za typ zamiast if else
      return (
        <div className="days-of-month">
          {daysOfMonth.map((day, index) => {
            return <button key={index} className={`day ${day} ` + daysFilteredByColor[day]} value={day} onClick={selectDay}>{day}</button>
          })}
        </div>
      )
    } else {
      return (
        <div className="days-of-month">
          {daysOfMonth.map((day, index) => { //moze to pierwsze filter
            let value;
            if (daysFilteredByColor[day] !== undefined)
              value = daysFilteredByColor[day].length;
            return <button key={index} className={`day ${day} count${value}`} value={day} onClick={selectDay}>{day}</button>
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
  };

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  let monthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dayOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

  // const currentDayToday = () => { }; //dzisiejsza data jest zaznaczona na kalendarzu
  // const firstDayOfMonth = () => { }; //oblicza pierwszy dzien w miesiacu i daje odpowiednie miejsca w gridzie 

  return (
    <div className="calendar">
      <div className="month-indicator">
        <p className="month-indicator__button" onClick={prevMonth}>{"<"}</p>
        <p className="month-indicator__label">{currentDay}</p>
        <p className="month-indicator__label">{monthsInYear[currentMonth - 1]}</p>
        <p className="month-indicator__label">{currentYear}</p>
        <p className="month-indicator__button" onClick={nextMonth}>{">"}</p>
      </div>
      <div className="day-of-week">
        {dayOfWeek.map((day, index) => {
          return <p key={index} className="top">{day}</p>
        })}
      </div>
      {getCalendar(currentMonth, currentYear)}
    </div>
  );
};

export default Calendar;

//ToDo: 
//context language and cookies with preferences
//refractor to smaller components
//css in js or tailwind
//rerender with every day selection