import { NavLink, useNavigate } from "react-router"
import { useContext } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import supabase from "../../utils/supabase"

export default function Nav() {
  const { loggedIn, setLoggedIn } = useContext(mainContext) as mainContextProps
  const navigate = useNavigate()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Fehler beim Logout", error)
    }
    setLoggedIn(false)
    navigate("/")
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="rezepte">Rezepte</NavLink>
      <NavLink to="about">Über uns</NavLink>
      <NavLink to="favoriten">Favoriten</NavLink>
      <NavLink to="profile">Profile</NavLink>
      {/* <NavLink to="login">Login</NavLink>
      <NavLink to="signup">Sign Up</NavLink> */}
      {!loggedIn ? (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-blue-600" : "text-gray-700 dark:text-gray-300 hover:text-blue-500"}`
            }>
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-blue-600" : "text-gray-700 dark:text-gray-300 hover:text-blue-500"}`
            }>
            Sign Up
          </NavLink>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 px-4 rounded-lg transition-all duration-200">
            Log Out
          </button>
        </div>
      )}
    </nav>
  )
}
