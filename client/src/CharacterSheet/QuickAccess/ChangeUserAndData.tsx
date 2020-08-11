import React, { useContext } from 'react';
import { players } from '../../Calendar/Players';
import { apiService } from '../../Services/FetchAPI';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer'

interface IProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeUserAndData: React.FC<IProps> = ({ setVisibility }) => {
  const { dispatch } = useContext(characterContext);

  const handlePlayers = async ({ target }: any) => {
    localStorage.setItem("user", `${target.value}`)
    setVisibility(prev => !prev);
    const characterData = await apiService.getCharacter();
    const parsedChar = JSON.parse(characterData[2]["Value"]);
    dispatch({ type: Types.SET_CHARACTER, payload: { newCharacter: parsedChar } });
  };

  return (
    <div className="c-change-usr">
      <div className="c-change-usr__close" />
      {players.map((name, index) => {
        return <button key={index} className="c-change-usr__btn" onClick={handlePlayers} value={name}>{name}</button>
      })}
    </div>
  )
};

export default ChangeUserAndData;