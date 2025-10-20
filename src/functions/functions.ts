import type { ICategory } from "../interfaces/ICategory"
import type { IFavorites } from "../interfaces/IFavorite"
import type { IIngredient } from "../interfaces/IIngredient"
// import type { IFavorites } from "../interfaces/IFavorites"
import type { IRecipe } from "../interfaces/IRecipe"
import supabase from "../utils/supabase"

// ? --------- Rezepte mit Kategorien auflisten ---------

export async function getRecipeAndCategory(): Promise<IRecipe[]> {
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select(`id, name, description, img_url, category:categories(name)`)
  if (error) {
    console.error(error)
  }
  return recipes as unknown as IRecipe[]
}

// ? ---------- Rezepte unter den Kategorien auflisten ------------

export async function getRecipeCategoryList(id: string): Promise<IRecipe[]> {
  const { data: recipes, error } = await supabase.from("recipes").select("*").eq("category_id", id)
  if (error) {
    console.error(error)
  }
  return recipes as unknown as IRecipe[]
}

// ? --------- Kategorien auflisten ---------

export async function getCategories(): Promise<ICategory[]> {
  const { data: categories, error } = await supabase.from("categories").select(`
    id,
    name,
    icon,
    recipe:recipes(name)
    `)
  if (error) {
    console.error(error)
  }
  return categories as unknown as ICategory[]
}

// ? --------- Kategoriename anzeigen lassen ---------

export async function getCategoryName(categories: ICategory[], categoryId: string | undefined): Promise<string> {
  const category = categories.find((category) => category.id === categoryId)
  return category ? category.name : ""
}

// ? ----------- Rezept-Details anzeigen lassen ------------

export async function getRecipeDetails(id: string): Promise<IRecipe[] | null> {
  const { data: details } = await supabase.from("recipes").select("*").eq("id", id)
  return details
}

// ? ---------- Zutatenliste zu Rezept-Details auflisten ------------

export async function getIngredients(id: string): Promise<IIngredient[] | null> {
  const { data: ingredients } = await supabase.from("ingredients").select("*").eq("recipe_id", id)
  return ingredients
}

// ? --------- Favoriten als Liste anzeigen lassen ---------

export const getFavorites = async (userId: string | undefined): Promise<IFavorites[] | unknown> => {
  const { data: favorites } = await supabase.from("favorites").select("id").eq("profile_id", userId).single()

  const { data: favRecipes } = await supabase
    .from("favorite_recipes")
    .select("id, recipes:recipe_id(*)")
    .eq("favorites_id", favorites?.id)

  return favRecipes
}
