import React from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/auth/login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browser from './components/Browser'
import Profile from './components/Profile'
import AppliedJobTable from './components/AppliedJobTable'
import JobDescription from './components/JobDescription'

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
    },
    {
      path: '/jobs', element: <Jobs />
    },
    {
      path: '/description/:id', element: <JobDescription />
    },
    {
      path: '/browser', element: <Browser />
    },
    {
      path: '/profile', element: <Profile />
    },
    {
      path: '/appliedjobs', element: <AppliedJobTable />
    },
  ])

  return (
    <>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </>
  )
}

export default App