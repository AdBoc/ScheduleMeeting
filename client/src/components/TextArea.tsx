import React from 'react';
import {editText} from "../redux/actions";
import {TextareaAutosize} from "react-autosize-textarea/lib/TextareaAutosize";
import {useDispatch} from "react-redux";

interface IProps {
  label: string;
  value: string;
  path: string;
}

const TextArea: React.FC<IProps> = ({value, label, path}) => {
  const dispatch = useDispatch();
  return (
    <>
      <label>{label}</label>
      <TextareaAutosize
        rows={3}
        value={value}
        onChange={({target}: any) => {
          dispatch(editText(path, target.value))
        }}
        spellCheck="false"
      />
    </>
  );
}

export default TextArea;