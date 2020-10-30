import React, {createContext, useState} from 'react';

export const userContext = createContext<{
  user: null | string;
  handleUser: ({target}: any) => void
}>({
  user: null,
  handleUser: () => null
});

const UserContextProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<null | string>(null);
  const handleUser = ({target}: any) => user === target.value ? setUser(null) : setUser(target.value);

  return (
    <userContext.Provider value={{user, handleUser}}>
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;