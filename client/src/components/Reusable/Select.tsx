import React from 'react';

interface IProps {
  range: number[]
  name: string;
  value: number;
  onChange: ({ target }: any) => void;
};

const NumberSelect: React.FC<IProps> = ({ range, name, value, onChange }) => {

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
