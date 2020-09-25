import React from 'react';
import {Redirect} from 'react-router-dom';

const Reset = () => {
  localStorage.clear();
  return <Redirect to={{pathname: "/"}}/>
}

export default Reset;