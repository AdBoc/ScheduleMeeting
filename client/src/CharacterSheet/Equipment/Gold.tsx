import React, {useContext} from 'react';

import {characterContext} from '../../context/Character';

import InputNumber from '../../components/InputNumber';

const Gold: React.FC<{ nodeRef: React.MutableRefObject<any> }> = ({nodeRef}) => {
  const {character} = useContext(characterContext);
  return (
    <div className="c-gold" ref={nodeRef}>
      <InputNumber prop={character.Other.Currency.PP} propName="Other.Currency.PP" fieldName="PP"/>
      <InputNumber prop={character.Other.Currency.GP} propName="Other.Currency.GP" fieldName="GP"/>
      <InputNumber prop={character.Other.Currency.EP} propName="Other.Currency.EP" fieldName="EP"/>
      <InputNumber prop={character.Other.Currency.SP} propName="Other.Currency.SP" fieldName="SP"/>
      <InputNumber prop={character.Other.Currency.CP} propName="Other.Currency.CP" fieldName="CP"/>
    </div>
  )
};

export default Gold;