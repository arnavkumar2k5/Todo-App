import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage/index.tsx'
import SignInPage from './pages/SignInPage/index.tsx'
import SignUpPage from './pages/SignUpContainer/index.tsx'
import './App.css'
import LandingPage from './pages/LandingPage/index.tsx'
import AuthProvider from './contexts/AuthContext.tsx/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/signIn',
        element: <SignInPage/>
      },
      {
        path: '/signUp',
        element: <SignUpPage/>
      },
      {
        path: '/home',
        element: <HomePage/>
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
    <RouterProvider router={router}/>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
