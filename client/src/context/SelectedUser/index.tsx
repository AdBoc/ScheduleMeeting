import React, {createContext, useState} from 'react';

export const playerContext = createContext<{
  user: string | null
  handleUser: ({target}: any) => void;
}>({
  user: null,
  handleUser: () => null
});

export const users = ['Test', 'Witek', 'Sławek', 'Potrek', 'Adrian', 'Adam', 'Krzysiek', 'Maciek'];

const PlayerContextProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<null | string>(null);

  const handleUser = ({target}: any) => {
    if (user === target.value) return setUser(null);
    return setUser(target.value);
  };

  return (
    <playerContext.Provider value={{user, handleUser}}>
      {children}
    </playerContext.Provider>
  )
}

export default PlayerContextProvider;
