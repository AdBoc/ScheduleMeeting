import React from 'react';

interface IProps {
  handleClick: (arg: string | null) => () => void;
  selectedPlayer: string | null;
}

export const players = ['Witek', 'Sławek', 'Potrek', 'Janek', 'Adrian', 'Adam', 'Krzysiek', 'Maciek'];

const Players: React.FC<IProps> = ({ handleClick, selectedPlayer: selectedName }) => {
  return (
    <div className="person-container">
      {players.map((person, index) => {
        if (selectedName && person === selectedName)
          return <button key={index} className="person-container__person--active" onClick={handleClick(person)}>{person}</button>
        return <button key={index} className="person-container__person" onClick={handleClick(person)}>{person}</button>
      })}
    </div>
  )
}

export default Players;