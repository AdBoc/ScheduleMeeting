import React, { useState } from 'react';
import './styles/App.css';
import './styles/CalendarApp.css';
import Calendar from './components/Calendar';

function App() {
  const [color, setColor] = useState<null | string>(null);

  return (
    <div className="calendarApp">
      <Calendar selectedColor={color} />
      <div className="colors">
        <p className="name witek" onClick={() => { color === null ? setColor('--blue') : setColor(null) }}>Witek</p>
        <p className="name slawek" onClick={() => { color === null ? setColor('--red') : setColor(null) }}>Sławek</p>
        <p className="name potek" onClick={() => { color === null ? setColor('--pink') : setColor(null) }}>Potrek</p>
        <p className="name janek" onClick={() => { color === null ? setColor('--yellow') : setColor(null) }}>Janek</p>
        <p className="name adrian" onClick={() => { color === null ? setColor('--green') : setColor(null) }}>Adrian</p>
        <p className="name adam" onClick={() => { color === null ? setColor('--brown') : setColor(null) }}>Adam</p>
        <p className="name krzysiek" onClick={() => { color === null ? setColor('--brown') : setColor(null) }}>Krzysiek</p>
        <p className="name maciek" onClick={() => { color === null ? setColor('--purple') : setColor(null) }}>Maciek</p>
      </div>
      <p>Date intersection: </p>
      <p>Source Code: ...github</p>
    </div>
  );
};

export default App;

//klikam drugi raz na czyjes imie to sie zaznacza null