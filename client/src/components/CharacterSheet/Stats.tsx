import React, { useContext } from 'react';
import NumberSelect from '../Reusable/NumberSelect';
import { characterContext } from '../../context/character';

const Stats: React.FC = () => {

  const { character } = useContext(characterContext);

  const returnModificator = (statValue: number) => {
    return Math.floor(statValue / 2) - 5;
  }

  const generateStats = () => {
    return Object.entries(character.Stats).map((stat, index) => {
      return (
        <div key={index} className="c-stats">
          <NumberSelect range={[0, 30]} name={`Stats.${stat[0]}`} value={stat[1]} />
          <p className="c-stats__stat">{stat[0]}</p>
          <p className="c-stats__mod-lab">MOD</p>
          <p className="c-stats__mod-val">{returnModificator(stat[1])}</p>
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