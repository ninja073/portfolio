import { useState, useEffect, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './themeContextDef'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null
      return stored ?? 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)

    if (theme === 'dark') {
      document.body.style.backgroundColor = '#0A0A0F'
      document.body.style.color = '#f3f4f6'
    } else {
      document.body.style.backgroundColor = '#F8FAFC'
      document.body.style.color = '#1e293b'
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
