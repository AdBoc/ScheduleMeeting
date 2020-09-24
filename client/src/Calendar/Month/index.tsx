import React, {useEffect, useState} from 'react';
import {Slide, toast, ToastContainer} from 'react-toastify';
import {CalendarProps, SelectedDays} from '../../ts/interfaces';
import {apiService} from '../../Services/FetchAPI';
import {useCalendar} from '../../hooks/useCalendar';
import Days from './Days';

const Month: React.FC<CalendarProps> = ({selectedPlayer}) => {
  let monthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dayOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

  const {prevMonth, nextMonth, dateProps} = useCalendar();
  const {currentMonth, currentYear} = dateProps;
  const [selectedDays, setSelectedDays] = useState<never | SelectedDays | false>(false);

  useEffect(() => {
    setSelectedDays(false);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      const {daysData, error} = await apiService.getSelectedMonthData(currentMonth + "/" + currentYear, abortController);
      if (daysData)
        setSelectedDays(daysData);
      if (error)
        toast.error("Connection error");
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
      {!selectedDays && <div className="calendar__fetching"><p className="calendar__fetching__text">...Loading</p></div>}
      {selectedDays && <Days
          dateProps={dateProps}
          selectedPlayer={selectedPlayer}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
      />}
      <ToastContainer transition={Slide} autoClose={1500} pauseOnHover={false} position="bottom-center" hideProgressBar newestOnTop/>
    </div>
  )
}

export default Month;
