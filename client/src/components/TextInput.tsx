import React from 'react';
import {useDispatch} from "react-redux";
import {editText} from "../redux/actions";

interface IProps {
  label: string;
  value: string;
  path: string;
}

const TextInput: React.FC<IProps> = ({label, path, value}) => {
  const dispatch = useDispatch();
  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        onChange={({target}) => dispatch(editText(path, target.value))}
        value={value}
        autoComplete="off"
        autoCorrect="false"
        spellCheck="false"
      />
    </>
  );
}

export default TextInput;