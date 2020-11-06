import React from 'react';
import {TextareaAutosize} from "react-autosize-textarea/lib/TextareaAutosize";
import {useDispatch, useSelector} from "react-redux";
import styles from "./textArea.module.scss";
import {RootState} from "../../redux/reducers";
import {Background} from "../../redux/types";
import {changeBackground} from "../../redux/actions";

interface IProps {
  label: string;
  backgroundProp: keyof Background;
}

const TextArea: React.FC<IProps> = ({label, backgroundProp}) => {
  const value = useSelector((stat: RootState) => stat.background[backgroundProp]);
  const dispatch = useDispatch();

  return (
    <div className={styles.textAreaComponent}>
      <label className={styles.label}>{label}</label>
      <TextareaAutosize
        className={styles.textArea}
        rows={3}
        value={value}
        onChange={({target}: any) => {dispatch(changeBackground(backgroundProp, target.value))}}
        spellCheck="false"
        maxLength={1000}
      />
    </div>
  );
}

export default TextArea;