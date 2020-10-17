import React, {useContext} from 'react';
import {userContext} from "../../../context/users";
import {MonthData} from "../../../types";

interface IProps extends MonthData {
  day: number;
}

const Day: React.FC<IProps> = ({day, handleSelectDay, filteredDays, isCurrentDay}) => {
  const {user} = useContext(userContext);

  const createClassName = (): string => {
    let className: string;
    if (user) {
      className = "day";
      className += (filteredDays[day] && " selected") || "";
    } else {
      className = "day count";
      className += (filteredDays[day] && filteredDays[day].length) || "";
      className += (isCurrentDay(day) && " today") || "";
    }
    return className;
  };

  return (
    <button
      className={createClassName()}
      value={day}
      onClick={handleSelectDay}>
      {day}
    </button>
  );
}

export default Day;