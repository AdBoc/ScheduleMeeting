import React, { useState } from 'react';
import Calendar from './components/Calendar';
import PickPerson from './components/PickPerson';
import Footer from './components/Footer';

import './styles/App.css';
import './styles/CalendarApp.scss';

function App() {
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

export default App;
