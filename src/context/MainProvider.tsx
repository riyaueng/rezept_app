import { createContext, useEffect, useState } from "react"
import type { IRecipe } from "../interfaces/IRecipe"
import type { ICategory } from "../interfaces/ICategory"
// import type { IIngredient } from "../interfaces/IIngredient"
import { getCategories, getRecipeAndCategory } from "../functions/functions.ts"
import type { IFavorites } from "../interfaces/IFavorites.ts"

export interface mainContextProps {
  recipes: IRecipe[]
  categories: ICategory[]
  favorites: IFavorites[] | null
  setFavorites: React.Dispatch<React.SetStateAction<IFavorites[] | null>>
  // ingredients: IIngredient[]
}

// eslint-disable-next-line react-refresh/only-export-components
export const mainContext = createContext<mainContextProps>(null!)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [favorites, setFavorites] = useState<IFavorites[] | null>([])
  // const [ingredients, setIngredients] = useState<IIngredient[]>([])

  useEffect(() => {
    async function getData() {
      // const recipes_function = await getRecipes()
      // setRecipes(recipes_function)
      const recipe_category = await getRecipeAndCategory()
      const categories_function = await getCategories()
      // await getFavorites()
      setRecipes(recipe_category)
      setCategories(categories_function)
    }
    getData()
  }, [])

  const value = {
    recipes,
    categories,
    favorites,
    setFavorites,
  }

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
