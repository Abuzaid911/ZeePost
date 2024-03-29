import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const ToggleDarkModeButton = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ToggleDarkModeButton;
