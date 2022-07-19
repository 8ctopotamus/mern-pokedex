import { createContext, useContext, useEffect, useState } from 'react'

const defaultTheme = 'light'

export const ThemeContext = createContext(defaultTheme)

export const ThemeProvider = props => {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')
      document.body.classList.add('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)