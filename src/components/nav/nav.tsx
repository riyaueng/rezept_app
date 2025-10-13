import { NavLink } from "react-router"
import "./nav.css"

export default function nav() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="rezepte">Rezepte</NavLink>
      <NavLink to="about">Über uns</NavLink>
      <NavLink to="favoriten">Favoriten</NavLink>
      <NavLink to="login">Login</NavLink>
    </nav>
  )
}
