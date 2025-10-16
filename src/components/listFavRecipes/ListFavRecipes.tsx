import { useContext, useEffect } from "react"
import type { IFavorites } from "../../interfaces/IFavorite"
import type { IProfile } from "../../interfaces/IProfile"
import { mainContext } from "../../context/MainProvider"
import { getFavorites } from "../../functions/functions"
import supabase from "../../utils/supabase"
import CardRecipe from "../cardRecipe/CardRecipe"

interface IFavRecipes {
  user: IProfile
  favorites: IFavorites[]
  setFavorites: React.Dispatch<React.SetStateAction<IFavorites[] | unknown>>
}

export default function ListFavRecipes() {
  const { user, favorites, setFavorites } = useContext(mainContext) as unknown as IFavRecipes

  // ? --------  Favoriten-Liste rendern --------

  useEffect(() => {
    const fetchFavorites = async () => {
      const result = await getFavorites(user.id)
      setFavorites(result)
    }
    fetchFavorites()
  }, [])

  console.log(favorites)

  // ? ------- Rezepte aus der Favoriten-Liste entfernen --------

  const removeRecipe = async (recipeId: string) => {
    await supabase.from("favorite_recipes").delete().eq("id", recipeId)

    const updatedFavorites = await getFavorites(user.id)
    setFavorites(updatedFavorites as IFavorites[])
  }

  return (
    <div>
      {favorites.map((favRecipe: IFavorites) => (
        <div key={favRecipe.id}>
          <CardRecipe
            name={favRecipe?.recipes.name}
            desc={favRecipe.recipes.description}
            onClick={() => removeRecipe(favRecipe.id)}
            link={`${favRecipe.recipes.id}`}
            recipe={favRecipe.recipes}
          />
        </div>
      ))}
    </div>
  )
}
