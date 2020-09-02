import React from 'react';
import { players } from '../../Calendar/Players';

interface IProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeUserAndData: React.FC<IProps> = ({ setVisibility }) => {

  const handlePlayers = ({ target }: any) => {
    localStorage.setItem("user", `${target.value}`);
    setVisibility(prev => !prev);
  };

  return (
    <div className="c-change-usr">
      {players.map((name, index) => {
        return <button key={index} className="c-change-usr__btn" onClick={handlePlayers} value={name}>{name}</button>
      })}
    </div>
  )
};

export default ChangeUserAndData;