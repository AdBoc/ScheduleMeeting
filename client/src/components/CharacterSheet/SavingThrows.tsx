import React, { useContext } from 'react';
import { characterContext } from '../../context/character';

const SavingThrows: React.FC = () => {

  const { character } = useContext(characterContext);
  // const [tagged, setTagged] = useState([]);

  const returnModificator = (statValue: number) => {
    return Math.floor(statValue / 2) - 5;
  };

  const toggleElement = () => {

  }

  const generateSavingThrows = () => {
    return Object.entries(character.Stats).map((stat, index) => {
      return (
        <div key={index} className="c-save-throw" onClick={toggleElement}>
          <p className="c-save-throw__title">{stat[0]}</p>
          <p>{returnModificator(stat[1])}</p>
        </div>
      )
    })
  };

  return (
    <>
      <p className="c-save-throws__title">Saving throws</p>
      <div className="c-save-throws">
        {generateSavingThrows()}
        <p>tagged 0/2</p>
      </div>
      <div className="c-save-death">
        <p className="c-save-death__title">Death save</p>
        <p className="c-save-death__label">Successes</p>
        <input className="c-save-death__checkbox" type="checkbox" />
        <input className="c-save-death__checkbox" type="checkbox" />
        <input className="c-save-death__checkbox" type="checkbox" />
        <p className="c-save-death__label">Failures</p>
        <input className="c-save-death__checkbox" type="checkbox" />
        <input className="c-save-death__checkbox" type="checkbox" />
        <input className="c-save-death__checkbox" type="checkbox" />
      </div>
    </>
  )
};

export default SavingThrows;