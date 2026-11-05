import React, { createContext, useContext, useState } from 'react'

const PopoverContext = createContext(null)

export const Popover = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </PopoverContext.Provider>
  )
}

export const PopoverTrigger = ({ children }) => {
  const context = useContext(PopoverContext)
  return React.cloneElement(children, {
    onClick: () => context.setOpen((current) => !current),
    role: 'button',
    tabIndex: 0,
    onKeyDown: (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        context.setOpen((current) => !current)
      }
    },
  })
}

export const PopoverContent = ({ children, className = '' }) => {
  const context = useContext(PopoverContext)
  if (!context.open) return null
  return (
    <div className={`absolute right-0 top-[calc(100%+12px)] z-50 rounded-md border bg-white p-4 shadow-lg ${className}`}>
      {children}
    </div>
  )
}
