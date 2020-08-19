import React, { useContext } from 'react';
import InputNumber from '../../components/InputNumber';
import { characterContext } from '../../context/Character';

const Gold = () => {
  const { character } = useContext(characterContext);
  return (
    <div className="c-gold">
      <InputNumber prop={character.Other.GP} propName="Other.GP" fieldName="GP"/>
    </div>
  )
};

export default Gold;