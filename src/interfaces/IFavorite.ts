import type { IRecipe } from "./IRecipe"

export interface IFavorites {
  id: string
  profile_id: string
  recipes: IRecipe
}
