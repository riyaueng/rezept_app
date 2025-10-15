import type { ICategory } from "../interfaces/ICategory"
import type { IIngredient } from "../interfaces/IIngredient"
// import type { IFavorites } from "../interfaces/IFavorites"
import type { IRecipe } from "../interfaces/IRecipe"
import supabase from "../utils/supabase"

// ? --------- Rezepte mit Kategorien auflisten ---------

export async function getRecipeAndCategory(): Promise<IRecipe[]> {
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select(`id, name, description, category:categories(name)`)
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
    recipe:recipes(name)
    `)
  if (error) {
    console.error(error)
  }
  return categories as unknown as ICategory[]
}

// ? --------- Kategoriename  anzeigen lassen ---------

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

// ? --------- Favoriten als Liste ---------
// export const getFavorites = async (): Promise<IFavorites[] | unknown> => {
//   const { data: favorites } = await supabase.from("favorites").select("*")
//   // .eq("recipe_id", recipes.id)
//   console.log(favorites)

//   return favorites
// }

// export async function addFavorites(recipeId: number) {
//   const { data: recipeExits, error: ErrorRecipe } = await supabase
//     .from("favorites")
//     .select("*")
//     .eq("favorite_id", recipeId)
//     .eq("recipe_id", recipeId)
// }
