import React from 'react';
import { CharacterInterface } from '../../ts/interfaces';


interface IProps {
  character: CharacterInterface;
}

const Attacks: React.FC<IProps> = ({ character }) => {
  return (
    <div className="sheet--view--attacks">
      <button>Add Attack</button>
      <div>
        <p>name</p>
        <p>dice</p>
      </div>
    </div>
  )
}

export default Attacks;