import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the type for the dark mode context value
type DarkModeState = [boolean, Dispatch<SetStateAction<boolean>>];

// Define a no-op function to satisfy the TypeScript signature requirement
const noop = () => {};

const DarkModeContext = createContext<DarkModeState>([false, noop]);

// Define the type for the props that DarkModeProvider accepts
type DarkModeProviderProps = {
  children: ReactNode;
};

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkModeState => useContext(DarkModeContext);
