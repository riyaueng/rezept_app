import { createContext, useEffect, useState } from "react"
import type { IRecipe } from "../interfaces/IRecipe"
import type { ICategory } from "../interfaces/ICategory"
import { getCategories, getFavorites, getRecipeAndCategory } from "../functions/functions.ts"
import type { IFavorites } from "../interfaces/IFavorite.ts"
import type { IIngredient } from "../interfaces/IIngredient.ts"
import supabase from "../utils/supabase.ts"
import type { IProfile } from "../interfaces/IProfile.ts"

export interface mainContextProps {
  recipes: IRecipe[]
  categories: ICategory[]
  ingredients: IIngredient[]
  favorites: IFavorites[] | null | unknown
  user: IProfile | null
  loggedIn: boolean
  loading: boolean
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>
  setIngredients: React.Dispatch<React.SetStateAction<IIngredient[]>>
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>
  setFavorites: React.Dispatch<React.SetStateAction<IFavorites[] | null | unknown>>
  setUser: React.Dispatch<React.SetStateAction<IProfile | null>>
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const mainContext = createContext<mainContextProps>(null!)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [favorites, setFavorites] = useState<IFavorites[] | null | unknown>([])
  const [ingredients, setIngredients] = useState<IIngredient[]>([])
  const [user, setUser] = useState<IProfile | null>(null)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // ? -------- Rezept-Liste und Kategorien rendern --------

  useEffect(() => {
    async function getData() {
      const recipe_category = await getRecipeAndCategory()
      const categories_function = await getCategories()
      // await getFavorites()
      setRecipes(recipe_category)
      setCategories(categories_function)
    }
    getData()
  }, [])

  // ? -------- Session überprüfen und Login rendern --------

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true)
      const { data } = await supabase.auth.getSession()
      const session = data?.session
      if (session?.user) {
        setUser(session.user as unknown as IProfile)
        setLoggedIn(true)
      } else {
        setUser(null)
        setLoggedIn(false)
      }
      setLoading(false)
    }
    checkSession()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as unknown as IProfile) || null)
      setLoggedIn(!!session?.user)
      setLoading(false)
    })

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkSession()
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      subscription.unsubscribe()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])
  // ? --------  Favoriten-Liste rendern --------

  useEffect(() => {
    if (!user?.id) return

    const fetchFavorites = async () => {
      const result = await getFavorites(user?.id)
      setFavorites(result)
    }
    fetchFavorites()
  }, [user?.id])

  const value = {
    recipes,
    categories,
    favorites,
    ingredients,
    user,
    loggedIn,
    loading,
    setRecipes,
    setCategories,
    setFavorites,
    setIngredients,
    setUser,
    setLoggedIn,
    setLoading,
  }

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
