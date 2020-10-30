import React from 'react';
import {editText} from "../../redux/actions";
import {TextareaAutosize} from "react-autosize-textarea/lib/TextareaAutosize";
import {useDispatch} from "react-redux";
import styles from "./textArea.module.scss";

interface IProps {
  label: string;
  value: string;
  path: string;
}

const TextArea: React.FC<IProps> = ({value, label, path}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.textAreaComponent}>
      <label className={styles.label}>{label}</label>
      <TextareaAutosize
        className={styles.textArea}
        rows={3}
        value={value}
        onChange={({target}: any) => {
          dispatch(editText(path, target.value))
        }}
        spellCheck="false"
        maxLength={1000}
      />
    </div>
  );
}

export default TextArea;