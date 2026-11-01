import React from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/auth/login'
import Signup from './components/auth/Signup'

const App = () => {

  const appRouter = createBrowserRouter([
    {
      path: '/', element: <Home />
    },
    {
      path: '/login', element: <Login />
    },
    {
      path: '/signup', element: <Signup />
    }
  ])

  return (
    <>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </>
  )
}

export default App