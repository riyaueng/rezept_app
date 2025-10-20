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
    <nav className="flex-1 flex justify-between gap-8">
      <div className="h-16 flex gap-6 items-center">
        <NavLink
          to="/"
          className={({ isActive }) => {
            return `font-medium ${
              isActive
                ? "text-orange-primary font-buttons"
                : "text-grey-fonts dark:text-blue-white hover:text-orange-light"
            }`
          }}>
          Home
        </NavLink>
        <NavLink
          to="rezepte"
          className={({ isActive }) => {
            return `font-medium ${
              isActive
                ? "text-orange-primary font-buttons"
                : "text-grey-fonts dark:text-blue-white hover:text-orange-light"
            }`
          }}>
          Rezepte
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) => {
            return `font-medium ${
              isActive
                ? "text-orange-primary font-buttons"
                : "text-grey-fonts dark:text-blue-white hover:text-orange-light"
            }`
          }}>
          Über uns
        </NavLink>
      </div>

      <div className=" flex items-center gap-8">
        <NavLink to="favoriten">
          {({ isActive }) => {
            return isActive ? (
              <img src="/public/img/icon_favoriten_active.svg" className="w-6" />
            ) : (
              <img src="/public/img/icon_favoriten_default.svg" className="w-6" />
            )
          }}
        </NavLink>
        <NavLink to="/rezept-erstellen">
          {({ isActive }) => {
            return isActive ? (
              <img src="/public/img/icon_rezept_active.svg" className="w-6" />
            ) : (
              <img src="/public/img/icon_rezept_default.svg" className="w-6" />
            )
          }}
        </NavLink>
        <NavLink to="/profile">
          {({ isActive }) => {
            return isActive ? (
              <img src="/public/img/icon_profile_active.svg" className="w-5" />
            ) : (
              <img src="/public/img/icon_profile_default.svg" className="w-5" />
            )
          }}
        </NavLink>
        {!loggedIn ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => {
                return `font-medium ${
                  isActive
                    ? "text-orange-primary font-buttons"
                    : "text-grey-fonts dark:text-blue-white hover:text-orange-light"
                }`
              }}>
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? "text-orange-primary font-buttons"
                    : "bg-orange-primary text-blue-white font-buttons text-sm tracking-wider rounded-tl-2xl rounded-bl-none rounded-br-2xl rounded-tr-2xl border-solid border-[1px] border-transparent py-2 px-4 "
                }`
              }>
              Sign Up
            </NavLink>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={logout}
              className="bg-blue-secondary text-blue-white font-buttons text-sm tracking-wider rounded-tl-2xl rounded-bl-none rounded-br-2xl rounded-tr-2xl border-solid border-[1px] border-transparent py-2 px-4 transition-all duration-200">
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
