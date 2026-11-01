import React from 'react'

export const Avatar = ({ children, className = '' }) => (
  <div className={`flex h-10 w-10 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
)

export const AvatarImage = ({ className = '', ...props }) => (
  <img className={`h-full w-full object-cover ${className}`} {...props} />
)

export const AvatarFallback = ({ children, className = '' }) => (
  <div className={`flex h-full w-full items-center justify-center bg-gray-200 ${className}`}>
    {children}
  </div>
)
