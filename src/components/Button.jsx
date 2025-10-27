import React from 'react'

const Button = ({children, className, type, onClick}) => {
  return (
      <button type={type} className={`text-light bg-accent-light dark:bg-accent-dark  shadow-md shadow-accent-light dark:shadow-black hover:bg-accent-light/90 duration-200 dark:hover:bg-accent-dark/90 active:scale-95 cursor-pointer  ${className}`} onClick={onClick}>{children}</button>
  )
}

export default Button