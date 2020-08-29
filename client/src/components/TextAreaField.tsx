import React, { useContext } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { characterContext } from '../context/Character';
import { Types } from '../context/Character/reducer';

interface IProps {
  prop: string;
  fieldName: string;
  propPath: string;
}

/**
* TextArea that changes values of Story property in character object
*/
const TextAreaField: React.FC<IProps> = ({ fieldName, prop, propPath }) => {
  const { dispatch } = useContext(characterContext);

  const handleTextArea = ({ target }: any) => {
    if (target.value.length < 1000)
      dispatch({ type: Types.EDIT_TEXT, payload: { property: propPath, newValue: target.value } });
  };

  return (
    <div className="g-text-area">
      <label className="g-text-area__label">{fieldName}
        <TextareaAutosize className="g-text-area__field" rows={3} value={prop} onChange={handleTextArea} spellCheck="false" />
      </label>
    </div>
  )
};

export default TextAreaField;

