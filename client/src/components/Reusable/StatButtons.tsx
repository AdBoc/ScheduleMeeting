import React from 'react';
import { ScheetActions, Types } from '../../context/sheetReducer';

interface IProps {
  /**
  * value of property
  */
  prop: number;
  /**
  * propName is path leading to object 
  */
  propName: string;
  /**
  * fieldName will be visible as label to buttons 
  */
  fieldName: string;
  dispatch: React.Dispatch<ScheetActions>;
}

const StatButtons: React.FC<IProps> = ({ prop, propName, fieldName, dispatch }) => {

  const increment = () => {
    dispatch({ type: Types.INCREMENT_STAT, payload: { property: propName } });
  };

  const decrement = () => {
    dispatch({ type: Types.DECREMENT_STAT, payload: { property: propName } });
  }

  return (
    <div className="generic-stat-buttons">
      <p>{fieldName}</p>
      <button className={prop === 0 ? "generic-stat-buttons--button hide" : "generic-stat-buttons--button"} onClick={decrement} > -</button>
      <p>{prop}</p>
      <button className="generic-stat-buttons--button" onClick={increment}>+</button>
    </div >
  );
};

export default StatButtons;
