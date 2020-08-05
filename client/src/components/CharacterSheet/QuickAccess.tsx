import React from 'react';
import { CharacterInterface } from '../../ts/interfaces';
import StatButtons from '../Reusable/StatButtons';
import { ScheetActions, Types } from './reducer/sheetReducer';

interface IProps {
  character: CharacterInterface;
  dispatch: React.Dispatch<ScheetActions>;
};

const QuickAccess: React.FC<IProps> = ({ character, dispatch }) => {
  return (
    <div className="sheet--view--story">
      <StatButtons prop={character.Level} propName="Level" dispatch={dispatch} />
      <StatButtons prop={character.HitPoints} propName="HitPoints" dispatch={dispatch} />
      <StatButtons prop={character.MainStats.ArmorClass} propName="MainStats.ArmorClass" dispatch={dispatch} />
      <StatButtons prop={character.MainStats.Initiative} propName="MainStats.Initiative" dispatch={dispatch} />
      {/* <StatButtons prop={character.HitPoints} propName="HitPoints" dispatch={dispatch} /> */}
      {/* <StatButtons prop={character.HitPoints} propName="HitPoints" dispatch={dispatch} /> */}
      {/* <StatButtons prop={character.HitPoints} propName="HitPoints" dispatch={dispatch} /> */}
    </div>
  )
}

export default QuickAccess;
