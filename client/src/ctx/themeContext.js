import { createContext, useContext, useState } from 'react'

const defaultTheme = 'light'

export const ThemeContext = createContext(defaultTheme)

export const ThemeProvider = props => {
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)