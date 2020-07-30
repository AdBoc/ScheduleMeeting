import React, { useEffect, useState } from 'react';
import { CalendarProps, SelectedDays } from '../ts/interfaces';
import { apiService } from '../helpers/ApiService';
import { useCalendar } from '../hooks/useCalendar';
import Days from './Days';

const Calendar: React.FC<CalendarProps> = ({ selectedColor }) => {

  let monthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dayOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

  const today = new Date();
  const [selectedDays, setSelectedDays] = useState<never | SelectedDays>([]);
  const { dateProps, prevMonth, nextMonth, parseWithColor, parseNoColor } = useCalendar(today);
  const { currentDay, currentMonth, currentYear } = dateProps;
  const daysFilteredByColor = selectedColor ? parseWithColor(selectedDays, selectedColor) : parseNoColor(selectedDays);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.getSelectedMonthData(currentMonth + "/" + currentYear);
      setSelectedDays(response.daysData);
    };

    fetchData();
  }, [currentMonth, currentYear]);

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
      <Days
        dateProps={dateProps}
        selectedColor={selectedColor}
        daysFilteredByColor={daysFilteredByColor}
      />
    </div>
  )
}

export default Calendar;
