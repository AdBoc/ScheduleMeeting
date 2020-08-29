import React, { useContext } from 'react';
import { characterContext } from '../context/Character';
import { Types } from '../context/Character/reducer';

interface IProps {
  prop: string;
  fieldName: string;
  propPath: string;
}

/**
* InpuField that allows to change values of Story property in character object
*/
const InputField: React.FC<IProps> = ({ fieldName, prop, propPath }) => {
  const { dispatch } = useContext(characterContext);

  const handleInput = ({ target }: any) => {
    if (target.value.length > 20)
      return;
    dispatch({ type: Types.EDIT_TEXT, payload: { property: propPath, newValue: target.value } });
  }

  return (
    <div className="g-input">
      <p className="g-input__label">{fieldName}</p>
      <input className="g-input__field" type="text" onChange={handleInput} value={prop} autoComplete="false" autoCorrect="false" spellCheck="false" />
    </div>
  )
}

export default InputField;
