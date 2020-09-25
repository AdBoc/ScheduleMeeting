import React, {useState} from 'react';
import './styles.scss';
import ThrowsValues from './ThrowsValues';

const SavingThrows: React.FC = () => {
  const [throws, setThrows] = useState([false, false, false, false, false, false]);

  const handleDeathThrows = ({target}: any) => {
    const newThrows = throws.slice(0);
    newThrows[target.name] = !newThrows[target.name];
    setThrows(newThrows);
  };

  return (
    <div className="c-saving-throws">
      <ThrowsValues/>
      <div className="c-save-death">
        <p className="c-save-death__title">Death save</p>
        <p className="c-save-death__label">Successes</p>
        <button className={throws[0] ? "c-checkbox --success" : "c-checkbox"} name="0" onClick={handleDeathThrows}/>
        <button className={throws[1] ? "c-checkbox --success" : "c-checkbox"} name="1" onClick={handleDeathThrows}/>
        <button className={throws[2] ? "c-checkbox --success" : "c-checkbox"} name="2" onClick={handleDeathThrows}/>
        <p className="c-save-death__label">Failures</p>
        <button className={throws[3] ? "c-checkbox --fail" : "c-checkbox"} name="3" onClick={handleDeathThrows}/>
        <button className={throws[4] ? "c-checkbox --fail" : "c-checkbox"} name="4" onClick={handleDeathThrows}/>
        <button className={throws[5] ? "c-checkbox --fail" : "c-checkbox"} name="5" onClick={handleDeathThrows}/>
      </div>
    </div>
  )
};

export default SavingThrows;