import { Link, useLocation } from "react-router"
import "./CardRecipe"

interface CardRecipeProps {
  name: string
  desc: string
  link: string
  // onClick: () => void | Promise<void>
}

export default function CardRecipe({ name, desc, link }: CardRecipeProps) {
  const location = useLocation()

  return (
    <div>
      <h3>{name}</h3>
      <p>{desc}</p>
      <Link to={location.pathname === "/rezepte" ? link : `rezepte/${link}`}>Zum Rezept</Link>
    </div>
  )
}
