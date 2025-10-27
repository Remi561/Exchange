import { useState, useEffect } from "react"
export const useTheme = () => {
    const KEY = 'theme-preference'
    const [theme, setTheme] = useState(() => {
        //init check if it any theme is stored
        const saved = localStorage.getItem(KEY);
        if (saved) return saved;

        
        //otherwise , use the system preference 
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'
        }
        return 'light'
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark')
        }

        localStorage.setItem(KEY, theme)
    })

    return [theme, setTheme]
}