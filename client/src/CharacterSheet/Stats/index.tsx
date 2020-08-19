import React, { useContext } from 'react';
import NumberSelect from '../../components/NumberSelect';
import { characterContext } from '../../context/Character';
import { charMethods } from '../../Services/CharacterMethods';
import './styles.scss';

const Stats: React.FC = () => {
  const { character } = useContext(characterContext);

  return (
    <div className="sheet--view">
      {
        Object.entries(character.Stats).map((stat, index) => (
          <div key={index} className="c-stats">
            <NumberSelect range={[0, 30]} name={`Stats.${stat[0]}`} value={stat[1]} />
            <p className="c-stats__stat">{stat[0]}</p>
            <p className="c-stats__mod-lab">MOD</p>
            <p className="c-stats__mod-val">{charMethods.calcStatModificator(stat[1])}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Stats;