import React, { createContext, Dispatch, useReducer } from 'react';
import { initialCharacter, ScheetActions } from './sheetReducer';
import { CharacterInterface } from '../ts/interfaces';
import { sheetReducer } from './sheetReducer';

export const characterContext = createContext<{
  character: CharacterInterface;
  dispatch: Dispatch<ScheetActions>;
}>({
  character: initialCharacter,
  dispatch: () => null
});

const CharacterContextProvider: React.FC = ({ children }) => {
  const [character, dispatch] = useReducer(sheetReducer, initialCharacter);

  return (
    <characterContext.Provider value={{ character, dispatch }}>
      {children}
    </characterContext.Provider>
  )
}

export default CharacterContextProvider;
