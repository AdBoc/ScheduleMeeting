import React, { useState } from 'react';
import { CharacterInterface } from '../../ts/interfaces';

interface IProps {
  character: CharacterInterface;
}

const SavingThrows: React.FC<IProps> = ({ character }) => {
 
  const [tagged, setTagged] = useState([]);

  const returnModificator = (statValue: number) => {
    return Math.floor(statValue / 2) - 5;
  };

  const generateSavingThrows = () => {
    return Object.entries(character.Stats).map((stat, index) => {
      return (
        <div key={index} className="sheet--view--saving-throws--section">
          <p className="sheet--view--saving-throws--section--title">{stat[0]}</p>
          <div className="sheet--view--saving-throws--section--value">
            <p>{returnModificator(stat[1])}</p>
          </div>
        </div>
      )
    })
  };

  return (
    <>
      <p className="sheet--view--title">Saving throws</p>
      <div className="sheet--view--saving-throws">
        {generateSavingThrows()}
      </div>
      <div className="sheet--view--death-saving">
        <p className="sheet--view--death-saving--title">Death save</p>
        <p className="sheet--view--death-saving--label">Successes</p>
        <input className="sheet--view--death-saving--checkbox" type="checkbox" />
        <input className="sheet--view--death-saving--checkbox" type="checkbox" />
        <input className="sheet--view--death-saving--checkbox" type="checkbox" />
        <p className="sheet--view--death-saving--label">Failures</p>
        <input className="sheet--view--death-saving--checkbox" type="checkbox" />
        <input className="sheet--view--death-saving--checkbox" type="checkbox" />
        <input className="sheet--view--death-saving--checkbox" type="checkbox" />
      </div>
    </>
  )
};

export default SavingThrows;