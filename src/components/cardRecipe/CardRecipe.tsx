import { Link } from "react-router"
import { useContext } from "react"
import { mainContext } from "../../context/MainProvider"
import { addFavorites } from "../../functions/addFavorites"
import type { IRecipe } from "../../interfaces/IRecipe"
import type { IFavorites } from "../../interfaces/IFavorite"

interface CardRecipeProps {
  recipe: IRecipe
  name: string
  desc: string
  link?: string
  img: string
  category?: string
  onClick?: () => void | Promise<void>
}

export default function CardRecipe(props: CardRecipeProps) {
  const { user, favorites, setFavorites } = useContext(mainContext)

  // Prüfen, ob das Rezept bereits favorisiert ist
  const isFavorited = Array.isArray(favorites) ? favorites.some((fav) => fav.recipes?.id === props.recipe.id) : false

  const handleToFavorites = async () => {
    if (!user) {
      console.error("Kein Benutzer angemeldet")
      return
    }

    try {
      await addFavorites(user.id, props.recipe.id)

      // Optional: Lokal aktualisieren, damit sofort das Herz aktualisiert wird
      if (isFavorited) {
        // Entferne aus Favoriten
        setFavorites((prev: IFavorites[]) => prev.filter((fav) => fav.recipes?.id !== props.recipe.id))
      } else {
        // Füge zu Favoriten hinzu
        setFavorites((prev: IFavorites[]) => [...(Array.isArray(prev) ? prev : []), { recipes: props.recipe }])
      }
    } catch (err) {
      console.error("Fehler beim Hinzufügen/Entfernen der Favoriten:", err)
    }
  }

  return (
    <div className="card">
      <div className="w-70 h-60 flex items-center justify-center overflow-hidden relative">
        <img src={props.recipe.img_url} alt={props.name} className="w-full h-full object-cover" />
      </div>
      <h3>{props.name}</h3>
      <p>{props.category}</p>
      <p>{props.desc}</p>

      <button onClick={handleToFavorites}>{isFavorited ? "❤️" : "♡"}</button>

      <Link to={`/rezepte/${props.link}`}>Zum Rezept</Link>
    </div>
  )
}
