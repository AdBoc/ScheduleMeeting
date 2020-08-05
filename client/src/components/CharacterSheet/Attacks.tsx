import React, { useState, useContext } from 'react';
import AddAttack from './AddAttack';
import { characterContext } from '../../context/character';

const Attacks: React.FC = () => {
  const [attackForm, setAttackForm] = useState(false);
  const { character } = useContext(characterContext);

  return (
    <div className="sheet--view--attacks">
      <button onClick={() => setAttackForm(prev => !prev)}>+ Add Attack</button>
      {attackForm && <AddAttack />}
      {character.Attacks.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}</p>
            <p>{item.diceType}</p>
            <p>{item.range}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Attacks;