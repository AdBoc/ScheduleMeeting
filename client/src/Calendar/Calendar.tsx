import React, { useState } from 'react';
import { Month, Players, Footer } from './index';

import './Calendar.scss';

const MainCalendar = () => {
  const [name, setName] = useState<null | string>(null);

  const handleClick = (arg: string | null) => () => {
    !name ? setName(arg) : arg === name ? setName(null) : setName(arg);
  };

  return (
    <div className="calendar-app">
      <Month selectedName={name} />
      <Players selectedName={name} handleClick={handleClick} />
      <Footer />
    </div>
  )
};

export default MainCalendar;