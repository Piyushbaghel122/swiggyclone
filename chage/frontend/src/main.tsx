import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import './index.css'
import App from './App.tsx'
import AuthProvider from './contextauth.tsx'

// 1. Create a root route
const rootRoute = createRootRoute()

// 2. Create the index route pointing to App
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

// 3. Create a placeholder login route so clicking 'Back to Sign In' works
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-center">
      <div className="bg-white p-8 rounded-xl shadow border border-gray-100 max-w-sm w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Login Page</h2>
        <p className="text-sm text-gray-500 mb-4">You have been redirected to the login page.</p>
        <a href="/" className="text-xs font-bold text-orange-600 hover:underline uppercase tracking-wide">Back to Reset Password</a>
      </div>
    </div>
  ),
})

// 4. Build route tree and create router
const routeTree = rootRoute.addChildren([indexRoute, loginRoute])
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
