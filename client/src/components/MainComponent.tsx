import React, { useState } from 'react';
import { Calendar, PickPerson, Footer } from './Calendar/index';

import '../styles/App.css';
import './Calendar/Calendar.scss';

const MainComponent = () => {
  const [name, setName] = useState<null | string>(null);

  const handleClick = (arg: string | null) => () => {
    !name ? setName(arg) : arg === name ? setName(null) : setName(arg);
  };

  return (
    <div className="calendar-app">
      <Calendar selectedName={name} />
      <PickPerson selectedName={name} handleClick={handleClick} />
      <Footer />
    </div >
  )
};

export default MainComponent;