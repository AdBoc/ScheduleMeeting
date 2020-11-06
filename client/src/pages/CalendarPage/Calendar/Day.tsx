import React, {useContext} from 'react';
import {userContext} from "../../../context/users";
import {MonthData} from "../../../types";
import styles from './calendar.module.scss';

interface IProps extends MonthData {
  day: number;
}

const Day: React.FC<IProps> = ({day, handleSelectDay, filteredDays, isCurrentDay}) => {
  const {user} = useContext(userContext);

  const createClassName = () => {
    let classes: string = "";
    classes += styles.day;
    if (user) {
      classes += (filteredDays[day] && " " + styles.selected) || "";
    } else {
      classes += (filteredDays[day] && " count"+filteredDays[day].length) || "";
      classes += (isCurrentDay(day) && " " + styles.today) || "";
    }
    return classes;
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