import React, { useContext } from 'react';
import { characterContext } from '../context/Character';
import { Types } from '../context/Character/reducer';
import { CharacterInterface } from '../ts/interfaces';

interface IProps {
  /**
  * value of P tag name of Story property
  */
  fieldName: string;
  property: keyof CharacterInterface["Story"];
}

/**
* TextArea that changes values of Story property in character object
*/
const TextAreaField: React.FC<IProps> = ({ fieldName, property }) => {

  const { character, dispatch } = useContext(characterContext);

  const handleTextArea = ({ target }: any) => dispatch({ type: Types.EDIT_TEXT, payload: { property, newValue: target.value } });

  return (
    <div className="g-text-area">
      <p className="g-text-area__label">{fieldName}</p>
      <textarea className="g-text-area__field" onChange={handleTextArea} value={character.Story[property]} maxLength={500}></textarea>
    </div>
  )
}

export default TextAreaField;
