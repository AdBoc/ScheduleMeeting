import React from 'react';
import {useDispatch} from "react-redux";
import {decrementStat, incrementStat} from "../redux/actions";

interface IProps {
  label: string;
  path: string;
  value: number;
}

const ModifyStatField: React.FC<IProps> = ({label, path, value}) => {
  const dispatch = useDispatch();
  return (
    <>
      <p>{label}</p>
      <button onClick={() => {
        dispatch(decrementStat(path))
      }}>-
      </button>
      <p>{value}</p>
      <button onClick={() => {
        dispatch(incrementStat(path))
      }}>+
      </button>
    </>
  );
}

export default ModifyStatField;