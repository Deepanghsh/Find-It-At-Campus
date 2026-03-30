import React, { createContext, useState, useEffect, useContext } from 'react';

// The available themes matching index.css class definitions
export const themes = [
  { id: 'ocean-blue', name: 'Ocean Blue', color: '#0ea5e9' },
  { id: 'cosmic-violet', name: 'Cosmic Violet', color: '#a855f7' },
  { id: 'rose-gold', name: 'Rose Gold', color: '#f43f5e' },
  { id: 'forest-green', name: 'Forest Green', color: '#22c55e' },
  { id: 'amber-glow', name: 'Amber Glow', color: '#f59e0b' },
  { id: 'midnight-slate', name: 'Midnight Slate', color: '#64748b' }
];

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'ocean-blue';
  });

  useEffect(() => {
    // Remove all theme classes first
    themes.forEach(theme => document.body.classList.remove(`theme-${theme.id}`));
    // Add the selected theme class
    document.body.classList.add(`theme-${currentTheme}`);
    // Save to local storage
    localStorage.setItem('app-theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
