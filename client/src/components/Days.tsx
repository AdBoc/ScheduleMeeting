import React from 'react';
import { LooseObject, DateProps } from '../ts/interfaces';
import { apiService } from '../helpers/ApiService';

interface IProps {
  dateProps: DateProps;
  selectedColor: string | null;
  daysFilteredByColor: LooseObject;
}

const Days: React.FC<IProps> = ({ dateProps, selectedColor, daysFilteredByColor }) => {

  const { currentMonth, currentYear, daysOfMonth, firstDayOfMonth } = dateProps;

  const handleDaySelect = ({ target }: any) => {
    const { value, className } = target;
    const isUndefined = /\b(\undefined)$/.test(className)
    if (selectedColor) { //let response and response = isUndefined in next line 
      isUndefined ? apiService.addSelectedDay(currentMonth + "/" + currentYear, value, selectedColor) :
        apiService.unselectDay(currentMonth + "/" + currentYear, value, selectedColor)
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
            return <button key={index} className={`day ${day} count${value}`} value={day} onClick={handleDaySelect}>{day}</button>
          })}
        </>
      }
    </div>
  )
}

export default Days;
