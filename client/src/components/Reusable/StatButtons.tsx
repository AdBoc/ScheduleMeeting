import React from 'react';
import { ScheetActions, Types } from '../CharacterSheet/reducer/sheetReducer';

interface IProps {
  prop: number;
  propName: string;
  dispatch: React.Dispatch<ScheetActions>;
}

const StatButtons: React.FC<IProps> = ({ prop, propName, dispatch }) => {

  const increment = () => {
    dispatch({ type: Types.INCREMENT_STAT, payload: { property: propName } });
  };

  const decrement = () => {
    dispatch({ type: Types.DECREMENT_STAT, payload: { property: propName } });
  }

  return (
    <div className="generic-stat-buttons">
      <p>{propName}</p>
      <button className={prop === 0 ? "generic-stat-buttons--button hide" : "generic-stat-buttons--button"} onClick={decrement} > -</button>
      <p>{prop}</p>
      <button className="generic-stat-buttons--button" onClick={increment}>+</button>
    </div >
  );
};

export default StatButtons;
