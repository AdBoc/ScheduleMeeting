import React, { useContext } from 'react';
import { characterContext } from '../context/Character';
import { Types } from '../context/Character/reducer';

interface IProps {
  prop: number;
  propName: string;
  fieldName: string;
};

const InputNumber: React.FC<IProps> = ({ fieldName, propName, prop }) => {
  const { dispatch } = useContext(characterContext);

  const handleChange = ({ target }: any) => dispatch({ type: Types.CHANGE_STAT, payload: { property: propName, newValue: target.value } });
 
  return (
    <div className="g-input-num">
      <p className="g-input-num__label">{fieldName}</p>
      <input className="g-input-num__val" type="number" value={prop} onChange={handleChange} />
    </div>
  )
};

export default InputNumber;
