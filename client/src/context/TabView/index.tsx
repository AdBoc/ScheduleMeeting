import React, { createContext, useState, useRef } from 'react';

const tabs = ["stats", "skills", "savingThrows", "allActions", "equipment", "story", "quickAccess"];

export const tabContext = createContext<{
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  indexRef: React.MutableRefObject<number>;
}>({
  currentView: tabs[0],
  setCurrentView: () => null,
  indexRef: { current: 0 }
});

const TabContextProvider: React.FC = ({ children }) => {
  const indexRef = useRef(0);
  console.log(indexRef.current);
  const [currentView, setCurrentView] = useState(tabs[indexRef.current]);
  //musi zostac przekazany obecny index lub byc zakodowany dla kazdego komponentu
  //tabs musza byc wyeksportowane globalnie lub  

  return (
    <tabContext.Provider value={{ currentView, setCurrentView, indexRef }}>
      {children}
    </tabContext.Provider>
  );
};

export default TabContextProvider;