import { createBrowserRouter, RouterProvider } from "react-router"
import { ToastContainer } from 'react-toastify'
import Login from "./pages/auth/login"
import Layout from "./components/layout/layout"
import Register from "./pages/auth/register"
import Todo from "./pages/restrictPage/Todo/Todo"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
   {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/todo",
    element: <Layout><Todo /></Layout>,
  },
])

const App = () => (
  <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <RouterProvider router={router} />
  </>
)

export default App
