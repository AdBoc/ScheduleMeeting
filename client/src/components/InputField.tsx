import React, { useContext } from 'react';
import { characterContext } from '../context/Character';
import { Types } from '../context/Character/reducer';
import { CharacterInterface } from '../ts/interfaces';

interface IProps {
  /**
  * value of P tag
  */
  fieldName: string;
  property: keyof CharacterInterface["Story"];
}

/**
* InpuField that allows to change values of Story property in character object
*/
const InputField: React.FC<IProps> = ({ fieldName, property }) => {
  const { character, dispatch } = useContext(characterContext);

  const handleInput = ({ target }: any) => {
    if (target.value.length > 20)
      return;
    dispatch({ type: Types.EDIT_TEXT, payload: { property, newValue: target.value } });
  }

  return (
    <div className="g-input">
      <p className="g-input__label">{fieldName}</p>
      <input className="g-input__field" type="text" onChange={handleInput} value={character.Story[property]} />
    </div>
  )
}

export default InputField;
