import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import "./App.css"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import Rezepte from "./pages/rezepte/Rezepte"
import About from "./pages/about/About"
import Login from "./pages/login/Login"
import Details from "./pages/details/Details"
import Category from "./pages/category/Category"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rezepte" element={<Rezepte />} />
        <Route path="about" element={<About />} />
        <Route path="kategorie/:category" element={<Category />} />
        <Route path="rezept/:id" element={<Details />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
