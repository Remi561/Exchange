import React from 'react'

import { LiaMoon, LiaSun } from 'react-icons/lia'
import { useTheme } from '../hooks/useTheme'

const Navbar = () => {
    
    const [theme, setTheme] = useTheme()
    const handleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(nextTheme)
    }
  return (
      <nav className='flex items-center justify-between bg-white text-slate-900 dark:bg-slate-800 dark:shadow-black   backdrop-blur-2xl  shadow-md rounded-xl shadow-purple-400 container mx-auto mt-3 h-15 px-3 '>
          <header className='capitalize text-3xl text-accent-light dark:text-accent-dark font-bold font-sans'>Exchange</header>

          <button onClick={handleTheme} className='rounded-full p-2 shadow-md text-2xl text-accent-light dark:accent-accent-dark dark:shadow-black dark:bg-slate-800 bg-light shadow-accent-light'>{theme === 'dark' ?<LiaSun/>: <LiaMoon/>}</button>
    </nav>
  )
}
export default Navbar
