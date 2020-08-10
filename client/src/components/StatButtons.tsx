import React, { useContext } from 'react';
import { Types } from '../context/Character/reducer';
import { characterContext } from '../context/Character';

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
}

const StatButtons: React.FC<IProps> = ({ prop, propName, fieldName }) => {

  const { dispatch } = useContext(characterContext);

  const increment = () => dispatch({ type: Types.INCREMENT_STAT, payload: { property: propName } });
  const decrement = () => dispatch({ type: Types.DECREMENT_STAT, payload: { property: propName } });

  return (
    <div className="g-add-button skills-margin">
      <p className="g-add-button__field">{fieldName}</p>
      <button className={prop <= -5 ? "g-add-button__btn hide" : "g-add-button__btn"} onClick={decrement} >-</button>
      <p className="g-add-button__val">{prop}</p>
      <button className="g-add-button__btn" onClick={increment}>+</button>
    </div>
  );
};

export default StatButtons;
