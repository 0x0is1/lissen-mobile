import React, { createContext, useState } from 'react'

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [activeThemeIndex, setActiveThemeIndex] = useState(0);
    return (
        <ThemeContext.Provider value={{
            activeThemeIndex,
            setActiveThemeIndex
        }}>
            {children}
        </ThemeContext.Provider>
    )
}