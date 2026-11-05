import React from 'react'

export const Avatar = ({ children, className = '', ...props }) => (
  <div {...props} className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 ${className}`}>
    {children}
  </div>
)

export const AvatarImage = ({ className = '', src, ...props }) => {
  const safeSrc = typeof src === 'string' && src.trim() ? src : null

  if (!safeSrc) return null

  return (
    <img src={safeSrc} className={`relative z-10 block h-full w-full object-cover ${className}`} {...props} />
  )
}

export const AvatarFallback = ({ children, className = '' }) => (
  <div className={`absolute inset-0 flex items-center justify-center bg-gray-200 ${className}`}>
    {children}
  </div>
)
