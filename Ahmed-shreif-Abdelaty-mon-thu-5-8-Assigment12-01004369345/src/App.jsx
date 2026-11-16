import { createBrowserRouter,RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
function App() {
  const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "blog", element: <Blogs /> },
        { path: "about", element: <About /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ],
  {
    basename: import.meta.env.BASE_URL
  }
)
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
