import React, {useState} from 'react';

const ThrowsCheckboxes = () => {
  const [throws, setThrows] = useState([false, false, false, false, false, false]);

  const handleThrows = ({target}: any) => {
    const newThrows = throws.slice(0);
    newThrows[+target.name] = !newThrows[+target.name];
    setThrows(newThrows);
  }

  return (
    <div>
      <p>Death Save</p>
      <p>Successes</p>
      <button name="0" onClick={handleThrows}/>
      <button name="1" onClick={handleThrows}/>
      <button name="2" onClick={handleThrows}/>
      <p>Failures</p>
      <button name="3" onClick={handleThrows}/>
      <button name="4" onClick={handleThrows}/>
      <button name="5" onClick={handleThrows}/>
    </div>
  );
}

export default ThrowsCheckboxes;