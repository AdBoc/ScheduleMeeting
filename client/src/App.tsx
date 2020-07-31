import React, { useState } from 'react';
import Calendar from './components/Calendar';
import PickPerson from './components/PickPerson';
import Footer from './components/Footer';

import './styles/App.css';
import './styles/CalendarApp.scss';

function App() {
  const [color, setColor] = useState<null | string>(null);

  const handleClick = (arg: string | null) => () => {
    !color ? setColor(arg) : arg === color ? setColor(null) : setColor(arg);
  };

  return (
    <div className="calendar-app">
      <Calendar selectedColor={color} />
      <PickPerson selectedColor={color} handleClick={handleClick} />
      <Footer />
    </div >
  );
};

export default App;
