import React from 'react';
import { CharacterInterface } from '../../ts/interfaces';
import StatButtons from '../Reusable/StatButtons';
import { ScheetActions, Types } from './reducer/sheetReducer';

interface IProps {
  character: CharacterInterface;
  dispatch: React.Dispatch<ScheetActions>;
};

const QuickAccess: React.FC<IProps> = ({ character, dispatch }) => {

  // const incrementStat = () => {
  //   dispatch({ type: Types.INCREMENT_STAT })
  // };

  // const subtractStat = () => {
  // };

  return (
    <div className="sheet--view--story">
      <StatButtons prop={character.Level} propName="Level" dispatch={dispatch}/>
      <div>
        <p>Max hitpoints</p>
      </div>
      <div>
        <p>Armor Class</p>
      </div>
      <div>
        <p>Initiative</p>
      </div>
      <div>
        <p>Speed</p>
      </div>
      <div>
        <p>Passive Perception</p>
      </div>
      <div>
        <p>Inspiration</p>
      </div>
    </div>
  )
}

export default QuickAccess;

//wystarczy dispach akcji 