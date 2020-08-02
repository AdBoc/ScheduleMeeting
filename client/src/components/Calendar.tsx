import React, { useEffect, useState } from 'react';
import { CalendarProps, SelectedDays } from '../ts/interfaces';
import { apiService } from '../helpers/ApiService';
import { useCalendar } from '../hooks/useCalendar';
import Days from './Days';

const Calendar: React.FC<CalendarProps> = ({ selectedName }) => {

  let monthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dayOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

  const today = new Date();
  const [selectedDays, setSelectedDays] = useState<never | SelectedDays>([]);
  const [statusResponse, setStatusResponse] = useState({});
  const { dateProps, prevMonth, nextMonth, parseWithName, parseNoName } = useCalendar(today);
  const { currentMonth, currentYear } = dateProps;
  const daysFilteredByName = selectedName ? parseWithName(selectedDays, selectedName) : parseNoName(selectedDays);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.getSelectedMonthData(currentMonth + "/" + currentYear);
      setSelectedDays(response.daysData);
    };

    fetchData();
  }, [currentMonth, currentYear, statusResponse]);

  return (
    <div className="calendar">
      <div className="month-indicator">
        <button className="month-indicator__button" onClick={prevMonth}>{"<"}</button>
        <p className="month-indicator__label">{monthsInYear[currentMonth - 1]}</p>
        <p className="month-indicator__label">{currentYear}</p>
        <button className="month-indicator__button" onClick={nextMonth}>{">"}</button>
      </div>
      <div className="day-of-week">
        {dayOfWeek.map((day, index) => {
          return <p key={index} className="top">{day}</p>
        })}
      </div>
      <Days
        dateProps={dateProps}
        selectedName={selectedName}
        daysFilteredByName={daysFilteredByName}
        setStatusResponse={setStatusResponse}
      />
    </div>
  )
}

export default Calendar;
