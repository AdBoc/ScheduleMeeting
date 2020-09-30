import React from 'react';
import {DateProps, SelectedDays} from '../../ts/interfaces';
import {apiService} from '../../Services/FetchAPI';
import {toast} from 'react-toastify';
import {useCalendar} from '../../hooks/useCalendar';

interface IProps {
  dateProps: DateProps;
  selectedPlayer: string | null;
  selectedDays: SelectedDays;
  setSelectedDays: React.Dispatch<React.SetStateAction<SelectedDays | false>>;
}

const Days: React.FC<IProps> = ({dateProps, selectedPlayer, setSelectedDays, selectedDays}) => {
  const {currentMonth, currentYear, firstDayOfMonth, daysOfMonth} = dateProps;
  const {parseUser, parseNoUser} = useCalendar();

  const daysFilteredByName = selectedPlayer ? parseUser(selectedDays, selectedPlayer) : parseNoUser(selectedDays);

  const emptyButtons: JSX.Element[] = [];
  let days: number;
  if (firstDayOfMonth)
    days = firstDayOfMonth - 1;
  else
    days = 6;
  for (let i = 0; i < days; i++) {
    emptyButtons.push(<button key={i} className="day"/>);
  }

  const handleDaySelect = async ({target}: any) => {
    const {value, className} = target;
    const doesNotExist = /\b(undefined)$/.test(className);
    if (doesNotExist) {
      if (selectedPlayer)
        setSelectedDays([...selectedDays, {day: value, user: selectedPlayer}]);
      const response = await apiService.addSelectedDay(currentMonth, currentYear, +value, selectedPlayer!);
      if (response === 403)
        toast.error("Month out of bounds");
      else if (response !== 200)
        toast.error("Connection error");
    } else if (!doesNotExist) {
      const testCopy = [...selectedDays];
      setSelectedDays(testCopy.filter((date) => (date.user !== selectedPlayer || (date.day !== +value && date.user === selectedPlayer))));
      const response = await apiService.unselectDay(currentMonth, currentYear, +value, selectedPlayer!);
      if (response === 403)
        toast.error("Month out of bounds");
      else if (response !== 200)
        toast.error("Connection error");
    }
  }

  const composeClassName = (day: number) => {
    const newCurrentDay = new Date();
    let className = `day ${day}`;
    className += daysFilteredByName[day] !== undefined ? ` count${daysFilteredByName[day].length}` : "";
    if (currentMonth === newCurrentDay.getMonth() && currentYear === newCurrentDay.getFullYear() && day === newCurrentDay.getDate()) {
      className += " currentDay";
    }
    return className;
  }

  return (
    <div className="days-of-month">
      {emptyButtons && emptyButtons}
      {selectedPlayer ?
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
};

export default Days;
