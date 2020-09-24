import React, {createContext, Dispatch, useReducer} from 'react';
import {initialCharacter, reducer, ScheetActions} from './reducer';
import {CharacterInterface} from '../../ts/interfaces';

export const characterContext = createContext<{
  character: CharacterInterface;
  dispatch: Dispatch<ScheetActions>;
}>({
  character: initialCharacter,
  dispatch: () => null
});

const CharacterContextProvider: React.FC = ({children}) => {
  let getCharacter: string | null | CharacterInterface = localStorage.getItem("character");
  if (getCharacter) {
    getCharacter = JSON.parse(getCharacter);
  } else {
    getCharacter = initialCharacter;
    localStorage.setItem("character", JSON.stringify(getCharacter));
  }

  const [character, dispatch] = useReducer(reducer, getCharacter as CharacterInterface);

  return (
    <characterContext.Provider value={{character, dispatch}}>
      {children}
    </characterContext.Provider>
  )
}

export default CharacterContextProvider;
