import React, { useEffect, useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { CalendarProps, SelectedDays } from '../../ts/interfaces';
import { apiService } from '../../Services/FetchAPI';
import { useCalendar } from '../../hooks/useCalendar';
import Days from './Days';

const Month: React.FC<CalendarProps> = ({ selectedPlayer }) => {
  let monthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dayOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

  const { prevMonth, nextMonth, parseUser, parseNoUser, dateProps } = useCalendar();
  const { currentMonth, currentYear } = dateProps;
  const [selectedDays, setSelectedDays] = useState<never | SelectedDays>([]);
  const [isFetching, setIsFetching] = useState(false);

  const daysFilteredByName = selectedPlayer ? parseUser(selectedDays, selectedPlayer) : parseNoUser(selectedDays);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsFetching(true);
      const { daysData, error } = await apiService.getSelectedMonthData(currentMonth + "/" + currentYear, abortController);
      if (daysData)
        setSelectedDays(daysData);
      if (error)
        toast.error("Connection error");
      setIsFetching(false);
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [currentMonth, currentYear]);

  return (
    <div className="calendar">
      <div className="month-indicator">
        <button className="month-indicator__button" onClick={prevMonth}>{"<"}</button>
        <div className="month-indicator__full">
          <p className="month-indicator__label">{monthsInYear[currentMonth]} {currentYear}</p>
        </div>
        <button className="month-indicator__button" onClick={nextMonth}>{">"}</button>
      </div>
      <div className="day-of-week">
        {dayOfWeek.map((day, index) => {
          return <p key={index} className="top">{day}</p>
        })}
      </div>
      {isFetching && <div className="calendar__fetching"><p className="calendar__fetching__text">...Loading</p></div>}
      <Days
        dateProps={dateProps}
        selectedPlayer={selectedPlayer}
        daysFilteredByName={daysFilteredByName}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      <ToastContainer transition={Slide} autoClose={1500} pauseOnHover={false} position="bottom-center" hideProgressBar newestOnTop />
    </div>
  )
}

export default Month;
