import React, { useState } from 'react';
import { DateProps, FilteredByName, FilteredAllNames } from '../../ts/interfaces';
import { apiService } from '../../helpers/ApiService';

interface IProps {
  dateProps: DateProps;
  selectedName: string | null;
  daysFilteredByName: FilteredByName | FilteredAllNames;
  setStatusResponse: React.Dispatch<React.SetStateAction<object>>;
}

const Days: React.FC<IProps> = ({ dateProps, selectedName, daysFilteredByName, setStatusResponse }) => {

  const { currentMonth, currentYear, daysOfMonth, firstDayOfMonth } = dateProps;
  const [isFetching, setIsFetching] = useState(false);

  const handleDaySelect = async ({ target }: any) => {
    const { value, className } = target;
    const doesNotExist = /\b(\undefined)$/.test(className);
    if (doesNotExist && !isFetching) {
      setIsFetching(prev => !prev);
      await apiService.addSelectedDay(currentMonth + "/" + currentYear, value, selectedName!);
      setStatusResponse({}); //if status=200 update or show error
      setIsFetching(prev => !prev);
    } else if (!doesNotExist && !isFetching) {
      setIsFetching(prev => !prev);
      await apiService.unselectDay(currentMonth + "/" + currentYear, value, selectedName!);
      setStatusResponse({});
      setIsFetching(prev => !prev);
    }
  }

  const addEmptyButtons = () => {
    const buttons = [];
    let days: number;
    if (firstDayOfMonth)
      days = firstDayOfMonth - 1;
    else
      days = 6;
    for (let i = 0; i < days; i++) {
      buttons.push(<button key={i} className="day"></button>);
    }
    return buttons;
  };

  const composeClassName = (day: string) => {
    const newCurrentDay = new Date();
    let className = `day ${day}`;
    className += daysFilteredByName[day] !== undefined ? ` count${daysFilteredByName[day].length}` : "";
    if (currentMonth - 1 === newCurrentDay.getMonth() && currentYear === newCurrentDay.getFullYear() && +day === newCurrentDay.getDate()) {
      className += " currentDay";
    }
    return className;
  }

  return (
    <div className="days-of-month">
      {addEmptyButtons()}
      {!!selectedName ?
        <>
          {daysOfMonth.map((day, index) => {
            return <button key={index} className={`day ${day} ` + daysFilteredByName[day]} value={day} onClick={handleDaySelect}>{day}</button>
          })}
        </> :
        <>
          {daysOfMonth.map((day, index) => {
            return <button key={index} className={composeClassName(day)} value={day}>{day}</button>
          })}
        </>
      }
    </div>
  )
}

export default Days;