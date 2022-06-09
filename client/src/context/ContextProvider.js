import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(false);

  return (
    <StateContext.Provider
      value={{hasToken, setHasToken}}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
