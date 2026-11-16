import { createBrowserRouter,RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
function App() {
  const BrowserRouter=createBrowserRouter([
    {path:"",element:<MainLayout/>,children:[
      {path:"",element:<Home/>},
      {path:"blog",element:<Blogs/>},
      {path:"about",element:<About/>},
      {path:"*",element:<NotFound/>}
    ]},
  ])
  return (
    <>
    <RouterProvider router={BrowserRouter}></RouterProvider>
    </>
  )
}

export default App
