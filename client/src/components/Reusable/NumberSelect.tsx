import React from 'react';
import { ScheetActions, Types } from '../CharacterSheet/reducer/sheetReducer';

interface IProps {
  /**
  * range of generated switch
  */
  range: [number, number];
  /**
  * path of property that will change in character object
  */
  name: string;
  /**
  * default value of generated switch
  */
  value: number;
  dispatch: React.Dispatch<ScheetActions>;
};

const NumberSelect: React.FC<IProps> = ({ range, name, value, dispatch }) => {

  const onChange = ({target}: any) => {
    dispatch({ type: Types.SWITCH_STAT, payload: { property: name, newValue: target.value } });
  }

  let options = [];
  for (let i = range[0]; i <= range[1]; i++) {
    options.push(<option key={i} value={i}>{i}</option>)
  };

  return (
    <select className="generic-select" value={value} name={name} onChange={onChange}>
      {options}
    </select>
  );
};

export default NumberSelect;

//MOZE ZAMIAST W TEN SPOSOB MOGE TO ZROBIC TAK 
//const numselect = (range, ...props) => {
//reutrn <select {...props}></select>
//}
