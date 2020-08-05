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
      <StatButtons prop={character.MainStats.Level} propName="MainStats.Level" dispatch={dispatch} fieldName="Level"/>
      <StatButtons prop={character.MainStats.HitPoints} propName="MainStats.HitPoints" dispatch={dispatch} fieldName="Max Hit Points" />
      <StatButtons prop={character.MainStats.ArmorClass} propName="MainStats.ArmorClass" dispatch={dispatch} fieldName="Armor Class"/>
      <StatButtons prop={character.MainStats.Initiative} propName="MainStats.Initiative" dispatch={dispatch} fieldName="Initiaive"/>
      <StatButtons prop={character.MainStats.PassivePercepion} propName="MainStats.PassivePercepion" dispatch={dispatch} fieldName="Passive Perception"/>
      <StatButtons prop={character.MainStats.Speed} propName="MainStats.Speed" dispatch={dispatch} fieldName="Speed"/>
      <StatButtons prop={character.MainStats.Inspiration} propName="MainStats.Inspiration" dispatch={dispatch} fieldName="Inspiration Points"/>
    </div>
  )
}

export default QuickAccess;
