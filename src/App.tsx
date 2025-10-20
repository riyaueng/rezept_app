import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import "./App.css"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Login from "./pages/login/Login"
import Details from "./pages/details/Details"
import Category from "./pages/category/Category"
import Favorites from "./pages/favorites/Favorites"
import Profile from "./pages/profile/Profile"
import SignUp from "./pages/signUp/SignUp"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import Recipes from "./pages/recipes/Recipes"
import CreateRecipe from "./pages/createRecipe/CreateRecipe"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rezepte" element={<Recipes />} />
        <Route path="rezepte/:id" element={<Details />} />
        <Route path="about" element={<About />} />
        <Route path="/kategorie/:category" element={<Category />} />
        <Route
          path="favoriten"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="rezept-erstellen"
          element={
            <ProtectedRoute>
              <CreateRecipe />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
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
