import React from 'react';
import {useDispatch} from "react-redux";
import {editText} from "../redux/actions";

interface IProps {
  label: string;
  value: number;
  path: string;
}

const NumberInput: React.FC<IProps> = ({label, path, value}) => {
  const dispatch = useDispatch();
  return (
    <>
      <label>{label}</label>
      <input
        type="number"
        onChange={({target}) => dispatch(editText(path, parseInt(target.value)))}
        value={value}
        autoComplete="off"
        autoCorrect="false"
        spellCheck="false"
      />
    </>
  );
}

export default NumberInput;