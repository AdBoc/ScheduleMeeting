import React, { useState } from 'react';
import { CharacterInterface } from '../../ts/interfaces';
import AddAttack from './AddAttack';

interface IProps {
  character: CharacterInterface;
}

const Attacks: React.FC<IProps> = ({ character }) => {

  const [attackForm, setAttackForm] = useState(false);

  return (
    <div className="sheet--view--attacks">
      <button onClick={() => setAttackForm(prev => !prev)}>+ Add Attack</button>
      {attackForm && <AddAttack />}
      <div>
        <p>name</p>
        <p>dice</p>
      </div>
    </div>
  )
}

export default Attacks;