import type { IRecipe } from "./IRecipe"

export interface IFavorites {
  id: number
  favorites_id: number
  recipe_id: IRecipe
}
