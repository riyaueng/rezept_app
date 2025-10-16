import { Link } from "react-router"
import "./CardRecipe"
import type { IFavorites } from "../../interfaces/IFavorite"
import type { IRecipe } from "../../interfaces/IRecipe"
import { addFavorites } from "../../functions/addFavorites"
import { useContext } from "react"
import { mainContext } from "../../context/MainProvider"

interface CardRecipeProps {
  recipe: IRecipe
  name: string
  desc: string
  link?: string
  favorites?: IFavorites
  onClick?: () => void | Promise<void>
}

export default function CardRecipe(props: CardRecipeProps) {
  const { user } = useContext(mainContext)

  const handleToFavorites = async () => {
    if (!user) {
      console.error("Dein Profil wurde nicht gefunden")
    } else {
      await addFavorites(user?.id, props.recipe.id)
    }
  }

  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.desc}</p>
      {props.favorites ? (
        <button onClick={props.onClick}>Entfernen</button>
      ) : (
        <>
          <button onClick={handleToFavorites}>♡</button>
        </>
      )}
      <Link to={`/rezepte/${props.link}`}>Zum Rezept</Link>
    </div>
  )
}
