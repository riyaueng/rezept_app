import type { ICategory } from "../interfaces/ICategory"
// import type { IFavorites } from "../interfaces/IFavorites"
import type { IRecipe } from "../interfaces/IRecipe"
import supabase from "../utils/supabase"

export async function getRecipeAndCategory(): Promise<IRecipe[]> {
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select(`id, name, description, category:categories(name)`)
  if (error) {
    console.error(error)
  }
  console.log(recipes)
  return recipes as unknown as IRecipe[]
}

export async function getCategories(): Promise<ICategory[]> {
  const { data: categories, error } = await supabase.from("categories").select(`
    name,
    recipe:recipes(name)
    `)
  if (error) {
    console.error(error)
  }
  console.log(categories)
  return categories as unknown as ICategory[]
}

// export async function getRecipeAndCategory(): Promise<IRecipe> {
//   const {data: recipe, error} = await supabase
//   .from()
// }

// ? ---- Favoriten ----
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

export async function getRecipeDetails(id: string): Promise<IRecipe[] | null> {
  const { data: details } = await supabase.from("recipes").select("*").eq("id", id)
  console.log(details)
  return details
}
