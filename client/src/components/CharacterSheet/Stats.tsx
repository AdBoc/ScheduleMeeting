import React from 'react';
import { CharacterInterface } from '../../ts/interfaces';

interface IProps {
  character: CharacterInterface;
}

const Stats: React.FC<IProps> = ({ character }) => {

  const returnModificator = (statValue: number) => {
    return Math.floor(statValue / 2) - 5;
  }

  const generateStats = () => {
    return Object.entries(character.Stats).map((stat, index) => {
      return (
        <div key={index} className="sheet--view--stats">
          <p>{stat[1]}</p>
          <p className="sheet--view--stats--stat">{stat[0]}</p>
          <p className="sheet--view--stats--mod">{returnModificator(stat[1])}</p>
        </div>
      )
    })
  };

  return (
    <div className="sheet--view">
      {generateStats()}
    </div>
  )
}

export default Stats;