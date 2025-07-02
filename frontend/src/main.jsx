import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import AppContextProvider from './context/AppContex'
import { ToastContainer } from 'react-toastify';
import EmailVerify from './pages/EmailVerify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/email-verify' element={<EmailVerify />} />
      <Route path='/reset-password' element={<ResetPassword />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <ToastContainer autoClose={3000}/>
    <RouterProvider router={router} />
  </AppContextProvider>
)
