import React, { useState } from 'react';
import './styles/App.css';
import './styles/CalendarApp.scss';
import Calendar from './components/Calendar';

function App() {
  const [color, setColor] = useState<null | string>(null);

  const handleClick = (arg: string | null) => () => {
    !!color ? setColor(null) : setColor(arg);
  };

  return (
    <div className="calendar-app">
      <Calendar selectedColor={color} />
      <div className="colors">
        <p className="name witek" onClick={handleClick('--blue')}>Witek</p>
        <p className="name slawek" onClick={handleClick('--red')}>Sławek</p>
        <p className="name potek" onClick={handleClick('--pink')}>Potrek</p>
        <p className="name janek" onClick={handleClick('--yellow')}>Janek</p>
        <p className="name adrian" onClick={handleClick('--green')}>Adrian</p>
        <p className="name adam" onClick={handleClick('--brown')}>Adam</p>
        <p className="name krzysiek" onClick={handleClick('--grey')}>Krzysiek</p>
        <p className="name maciek" onClick={handleClick('--purple')}>Maciek</p>
      </div>
      <p>Date intersection: </p>
      <footer className="footer">
        <p>Source Code: ...github</p>
      </footer>
    </div >
  );
};

export default App;

//klikam drugi raz na czyjes imie to sie zaznacza null