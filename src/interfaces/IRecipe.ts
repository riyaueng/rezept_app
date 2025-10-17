// import type { ICategory } from "./ICategory"

export interface IRecipe {
  id: string
  name: string
  description: string
  servings?: number
  instructions: string
  category_id?: string
  img_url: string
  // category: ICategory
}
