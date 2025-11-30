import { useContext } from "react"
import { mainContext } from "../../context/MainProvider"
import { addFavorites } from "../../functions/addFavorites"
import type { IRecipe } from "../../interfaces/IRecipe"
import type { IFavorites } from "../../interfaces/IFavorite"
import Button from "../button/Button"

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
    <div className="w-94 h-122 mb-3 bg-pastel-white flex flex-col justify-between rounded-4xl rounded-br-none shadow-[1px_7px_15px_-2px_#d2e1fc]">
      <div className="w-94 h-60 flex items-center justify-center overflow-hidden relative rounded-tr-4xl ">
        <img src={props.recipe.img_url} alt={props.name} className="w-full h-full object-cover" />
        <button
          onClick={handleToFavorites}
          className="flex justify-center w-11 h-11 bg-pastel-white rounded-full absolute top-4 right-4 ">
          {isFavorited ? (
            <img src="/public/img/icon_herz_active.svg" alt="Herz Icon in Orange aktivier" className="w-6" />
          ) : (
            <img src="/public/img/icon_favoriten_default.svg" alt="Herz Icon nicht aktiviert" className="w-6" />
          )}
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-between px-8 mb-5">
        <div className="mb-8">
          <h3 className="text-2xl tracking-wide leading-tight mt-4 mb-2">{props.name}</h3>
          <p>{props.category}</p>
          <p>{props.desc}</p>
        </div>
        <div className="my-5">
          <Button link={`/rezepte/${props.link}`} text="Zum Rezept" />
        </div>
      </div>
    </div>
  )
}
