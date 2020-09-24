import React, {useState} from 'react';
import {Footer, Month, Players} from './index';
import './Calendar.scss';

const Calendar = () => {
  const [player, setPlayer] = useState<null | string>(null);

  const handlePlayer = (arg: string | null) => () => {
    if (player === arg) return setPlayer(null);
    return setPlayer(arg);
  };

  return (
    <div className="calendar-app">
      <Month selectedPlayer={player}/>
      <Players selectedPlayer={player} handleClick={handlePlayer}/>
      <Footer selectedPlayer={player}/>
    </div>
  )
};

export default Calendar;