import type { ICategory } from "../interfaces/ICategory"
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
