import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import type { IRecipe } from "../../interfaces/IRecipe"
import { getIngredients, getRecipeDetails } from "../../functions/functions"
import { mainContext } from "../../context/MainProvider"
import type { IIngredient } from "../../interfaces/IIngredient"
import { addFavorites } from "../../functions/addFavorites"
import type { IFavorites } from "../../interfaces/IFavorite"

export default function Details() {
  const { user, favorites, setFavorites, ingredients, setIngredients } = useContext(mainContext)
  const { id } = useParams<{ id: string }>()
  const [recipeDetails, setRecipeDetails] = useState<IRecipe | null>(null)

  // ? ------ Rezept-Details rendern ------

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const detail = (await getRecipeDetails(id)) as IRecipe[]
      setRecipeDetails(detail[0])
    })()
  }, [id])

  // ? ------ Zutatenliste rendern ------

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const ingredient = (await getIngredients(id)) as IIngredient[]
      setIngredients(ingredient)
    })()
  }, [id])

  if (!recipeDetails) return <div>Lädt Rezept-Details…</div>
  if (!ingredients) return <div>Lädt Zutatenliste…</div>

  // ? ------ Favoriten hinzufügen --------
  // Prüfen, ob das Rezept bereits favorisiert ist
  const isFavorited = Array.isArray(favorites) ? favorites.some((fav) => fav.recipes?.id === recipeDetails.id) : false

  const handleToFavorites = async () => {
    if (!user) {
      console.error("Kein Benutzer angemeldet")
      return
    }

    try {
      await addFavorites(user.id, recipeDetails.id)

      // Optional: Lokal aktualisieren, damit sofort das Herz aktualisiert wird
      if (isFavorited) {
        // Entferne aus Favoriten
        setFavorites((prev: IFavorites[]) => prev.filter((fav) => fav.recipes?.id !== recipeDetails.id))
      } else {
        // Füge zu Favoriten hinzu
        setFavorites((prev: IFavorites[]) => [...(Array.isArray(prev) ? prev : []), { recipes: recipeDetails }])
      }
    } catch (err) {
      console.error("Fehler beim Hinzufügen/Entfernen der Favoriten:", err)
    }
  }

  return (
    <section className="mx-30 mb-20">
      <div className="h-120 flex items-center justify-center overflow-hidden relative rounded-[2.5rem] rounded-bl-none rounded-tr-none">
        <button
          onClick={handleToFavorites}
          className="flex justify-center w-11 h-11 bg-pastel-white rounded-full absolute top-7 right-7 ">
          {isFavorited ? (
            <img src="/public/img/icon_herz_active.svg" alt="Herz Icon in Orange aktivier" className="w-6" />
          ) : (
            <img src="/public/img/icon_favoriten_default.svg" alt="Herz Icon nicht aktiviert" className="w-6" />
          )}
        </button>
        <img src={recipeDetails.img_url} alt={recipeDetails.name} className="w-full h-full object-cover" />
      </div>

      <h2>{recipeDetails.name}</h2>
      <p>{recipeDetails.description}</p>
      <h3>Portionen</h3>
      <p>{recipeDetails.servings} Portionen</p>
      <h3>Zutaten</h3>
      <ul>
        {}
        {ingredients.map((ingredient: IIngredient) => {
          return (
            <li key={ingredient.id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}, {ingredient.additional_info}
            </li>
          )
        })}
      </ul>
      <h3>Zubereitung</h3>
      <p>{recipeDetails.instructions}</p>
    </section>
  )
}
