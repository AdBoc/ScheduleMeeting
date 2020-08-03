import React from 'react';
import { CharacterInterface } from '../../ts/interfaces';

interface IProps {
  character: CharacterInterface;
}

const Equipment: React.FC<IProps> = ({ character }) => {
  return (
    <div className="sheet--view--equipment">
      <p className="sheet--view--equipment--title">Equipment</p>
    </div>
  )
}

export default Equipment;