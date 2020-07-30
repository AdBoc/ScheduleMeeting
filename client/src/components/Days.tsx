import React from 'react';
import { DateProps, FilteredByColor, FilteredAllColors } from '../ts/interfaces';
import { apiService } from '../helpers/ApiService';

interface IProps {
  dateProps: DateProps;
  selectedColor: string | null;
  daysFilteredByColor: FilteredByColor | FilteredAllColors;
  setStatusResponse: React.Dispatch<React.SetStateAction<object>>;
}

const Days: React.FC<IProps> = ({ dateProps, selectedColor, daysFilteredByColor, setStatusResponse }) => {

  const { currentMonth, currentYear, daysOfMonth, firstDayOfMonth } = dateProps;

  const handleDaySelect = async ({ target }: any) => {
    const { value, className } = target;
    const doesNotExist = /\b(\undefined)$/.test(className);
    if (doesNotExist) {
      await apiService.addSelectedDay(currentMonth + "/" + currentYear, value, selectedColor!);
      setStatusResponse({}); //if status=200 update
    } else {
      await apiService.unselectDay(currentMonth + "/" + currentYear, value, selectedColor!);
      setStatusResponse({});
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

  return (
    <div className="days-of-month">
      {addEmptyButtons()}
      {!!selectedColor ?
        <>
          {daysOfMonth.map((day, index) => {
            return <button key={index} className={`day ${day} ` + daysFilteredByColor[day]} value={day} onClick={handleDaySelect}>{day}</button>
          })}
        </> :
        <>
          {daysOfMonth.map((day, index) => {
            let value;
            if (daysFilteredByColor[day] !== undefined) //jesli taki dzien nie istnieje to nie badaj dlugosci tablicy ktora nie istnieje
              value = daysFilteredByColor[day].length;
            return <button key={index} className={`day ${day} count${value}`} value={day}>{day}</button>
          })}
        </>
      }
    </div>
  )
}

export default Days;
