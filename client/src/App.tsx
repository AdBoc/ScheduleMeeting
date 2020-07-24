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
        <p className="name witek" onClick={() => { setColor('--blue') }}>Witek</p>
        <p className="name slawek" onClick={() => { setColor('--red') }}>Sławek</p>
        <p className="name potek" onClick={() => { setColor('--pink') }}>Potrek</p>
        <p className="name janek" onClick={() => { setColor('--yellow') }}>Janek</p>
        <p className="name adrian" onClick={() => { setColor('--green') }}>Adrian</p>
        <p className="name adam" onClick={() => { setColor('--brown') }}>Adam</p>
        <p className="name maciek" onClick={() => { setColor('--purple') }}>Maciek</p>
      </div>
      <p>Date intersection: </p>
    </div>
  );
}

export default App;
