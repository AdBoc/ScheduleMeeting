import React, { useState } from 'react';

interface IProps {
  selectedColor: string | null;
}

interface LooseObject {
  [key: string]: any
}

const Calendar: React.FC<IProps> = ({ selectedColor }) => { //destructuring because of props arg

  let today = new Date();
  let selectedDays: LooseObject = { '1': '--blue --red', '13': '--yellow', '14': '--yellow', '5': '--blue' };

  if (selectedColor !== null) { //filter selectedDays
    const filtered = Object.keys(selectedDays).filter(day =>
      selectedDays[day] === selectedColor
    ).map(key => ({
      [key]: selectedDays[key]
    }));
    console.log(filtered);
    const newobj = filtered.reduce((acc, cur, i) => {
      acc[i] = cur;
      return acc;
    }, {});
    console.log(newobj);
  } else {
    console.log(selectedDays);
  }

  const [currentDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const selectDay = ({ target }: any) => {
    const { value } = target;
    //wysyla date to api i odpalany jest useEffect
    //wysylana jest info o kolorku
  }

  const getCalendar = (month: number, year: number) => {
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let daysOfMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysOfMonth.push(i.toString());
    }

    return (
      <div className="days">
        {daysOfMonth.map((day, index) => { //musialnym iterowac za jazdym razem po obiekcie az znajdzie jego wartosc
          if (selectedDays[day] !== undefined)
            return <button className={`day ${day} ${selectedDays[day]}`} value={day} key={index} onClick={selectDay}>{day}</button>
          else
            return <button className={`day ${day}`} value={day} key={index} onClick={selectDay}>{day}</button>
        })}
      </div>
    )
  }

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    //getuje od api default selected values
  }

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    //getuje od api default selected values
  }

  return (
    <>
      <div className="CalendarFlex">
        <p className="top">{"<<"}</p>
        <p className="top" onClick={prevMonth}>{"<"}</p>
        <p className="top">{currentDay + "." + currentMonth + "." + currentYear}</p>
        <p className="top" onClick={nextMonth}>{">"}</p>
        <p className="top">{">>"}</p>
      </div>
      <div className="CalendarFlex">
        <p className="top">SUN</p>
        <p className="top">MON</p>
        <p className="top">TUE</p>
        <p className="top">WED</p>
        <p className="top">THU</p>
        <p className="top">FRI</p>
        <p className="top">SAT</p>
      </div>
      {getCalendar(currentMonth, currentYear)}
    </>
  );
};

export default Calendar;
//JAK JEST WYBRANY KOLOR ZWRACANE SA Z BACKENDU TYLKO TE WARTOSCI DLA DANEGO KOLORU
//grida walnac

// Object.filter = (obj: any, predicate: any) =>
//   Object.keys(obj)
//     .filter(key => predicate(obj[key]))
//     .reduce((res: any, key) => (res[key] = obj[key], res), {});

// Object.filter = (obj: any, predicate: any) =>
//   Object.assign(...Object.keys(obj)
//     .filter(key => predicate(obj[key]))
//     .map(key => ({ [key]: obj[key] })));

// console.log(Object.entries(selectedDays));
// const result = selectedDays[0].slice(0, selectedDays[0].indexOf(',')); //wyciaga tylko 1 wartosc
// console.log(result);

// let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//zmienic kolorek w hover i focused czy selected na przycisku zeby nie pisac tego w js


// let selectedDays: LooseObject = { '1': '--blue --red', '13': '--yellow', '14': '--yellow', '5': '--blue' };
// let selectedDays = [
//   { day: '1', color: "--blue" },
//   { day: '2', color: "--blue" },
//   { day: '2', color: "--red" }
// ];
//kazdy miesiac ma tablice rowna ilosci dni i w tej tablicy sa zapisane kolory dla kazdego dnia
//let seletedDays = [{5: '--blue'}, {6: '--red'}, {6: '--blue}];