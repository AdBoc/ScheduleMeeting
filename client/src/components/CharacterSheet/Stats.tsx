import React, { useContext } from 'react';
import NumberSelect from '../Reusable/NumberSelect';
import { characterContext } from '../../context/character';

const Stats: React.FC = () => {

  const { character, dispatch } = useContext(characterContext);

  const returnModificator = (statValue: number) => {
    return Math.floor(statValue / 2) - 5;
  }

  const generateStats = () => {
    return Object.entries(character.Stats).map((stat, index) => {
      return (
        <div key={index} className="sheet--view--stats">
          <NumberSelect range={[0, 30]} name={`Stats.${stat[0]}`} value={stat[1]} dispatch={dispatch} />
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