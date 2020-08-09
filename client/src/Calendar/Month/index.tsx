import React, { useEffect, useState } from 'react';
import { CalendarProps, SelectedDays } from '../../ts/interfaces';
import { apiService } from '../../Services/CalendarFetch';
import { useCalendar } from '../../hooks/useCalendar';
import Days from './Days';

const Month: React.FC<CalendarProps> = ({ selectedPlayer }) => {

  let monthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dayOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

  const { prevMonth, nextMonth, parseWithName, parseNoName, dateProps } = useCalendar();
  const { currentMonth, currentYear } = dateProps;
  const [selectedDays, setSelectedDays] = useState<never | SelectedDays>([]);
  const [responseStatus, setResponseStatus] = useState({});

  const daysFilteredByName = selectedPlayer ? parseWithName(selectedDays, selectedPlayer) : parseNoName(selectedDays);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.getSelectedMonthData(currentMonth + "/" + currentYear);
      setSelectedDays(response.daysData);
    };

    fetchData();
  }, [currentMonth, currentYear, responseStatus]);

  return (
    <div className="calendar">
      <div className="month-indicator">
        <button className="month-indicator__button" onClick={prevMonth}>{"<"}</button>
        <div className="month-indicator__full">
          <p className="month-indicator__label">{monthsInYear[currentMonth - 1]} {currentYear}</p>
        </div>
        <button className="month-indicator__button" onClick={nextMonth}>{">"}</button>
      </div>
      <div className="day-of-week">
        {dayOfWeek.map((day, index) => {
          return <p key={index} className="top">{day}</p>
        })}
      </div>
      <Days
        dateProps={dateProps}
        selectedPlayer={selectedPlayer}
        daysFilteredByName={daysFilteredByName}
        setStatusResponse={setResponseStatus}
      />
    </div>
  )
}

export default Month;
