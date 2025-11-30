import { NavLink } from "react-router"
import Nav from "../nav/nav"

export default function Header() {
  return (
    <header className="mx-30">
      <section className="py-3.5 flex gap-18 items-center">
        <NavLink to="/" className={" "}>
          <img src="/public/img/rezeptwelt_logo.svg" alt="Rezeptwelt Logo" className="h-11" />
        </NavLink>
        <Nav />
      </section>
    </header>
  )
}
