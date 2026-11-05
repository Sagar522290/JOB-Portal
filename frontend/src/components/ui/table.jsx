import React from 'react'

export const Table = ({ children, className = '' }) => (
  <div className="relative w-full overflow-x-auto">
    <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
  </div>
)

export const TableHeader = ({ children, className = '' }) => (
  <thead className={className}>{children}</thead>
)

export const TableBody = ({ children, className = '' }) => (
  <tbody className={className}>{children}</tbody>
)

export const TableFooter = ({ children, className = '' }) => (
  <tfoot className={className}>{children}</tfoot>
)

export const TableRow = ({ children, className = '' }) => (
  <tr className={`border-b transition-colors ${className}`}>{children}</tr>
)

export const TableHead = ({ children, className = '' }) => (
  <th className={`h-10 px-4 text-left align-middle font-medium text-gray-500 ${className}`}>
    {children}
  </th>
)

export const TableCell = ({ children, className = '', ...props }) => (
  <td {...props} className={`p-4 align-middle ${className}`}>{children}</td>
)

export const TableCaption = ({ children, className = '' }) => (
  <caption className={`mt-4 text-sm text-gray-500 ${className}`}>{children}</caption>
)
