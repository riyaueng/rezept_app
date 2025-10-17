import { useContext } from "react"
import type { IFavorites } from "../../interfaces/IFavorite"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import { getFavorites } from "../../functions/functions"
import supabase from "../../utils/supabase"
import CardRecipe from "../cardRecipe/CardRecipe"

interface IFavRecipes {
  favorites: IFavorites[]
}

export default function ListFavRecipes({ favorites }: IFavRecipes) {
  const { user, setFavorites } = useContext(mainContext) as unknown as mainContextProps

  // ? ------- Rezepte aus der Favoriten-Liste entfernen --------

  const removeRecipe = async (recipeId: string) => {
    await supabase.from("favorite_recipes").delete().eq("id", recipeId)

    const updatedFavorites = await getFavorites(user?.id)
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
