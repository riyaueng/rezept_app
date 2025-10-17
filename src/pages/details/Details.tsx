import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import type { IRecipe } from "../../interfaces/IRecipe"
import { getIngredients, getRecipeDetails } from "../../functions/functions"
import { mainContext } from "../../context/MainProvider"
import type { IIngredient } from "../../interfaces/IIngredient"

export default function Details() {
  const { ingredients, setIngredients } = useContext(mainContext)
  const { id } = useParams<{ id: string }>()
  const [recipeDetails, setRecipeDetails] = useState<IRecipe | null>(null)

  // ? ------ Rezept-Details rendern ------

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const detail = (await getRecipeDetails(id)) as IRecipe[]
      setRecipeDetails(detail[0])
    })()
  }, [id])

  // ? ------ Zutatenliste rendern ------

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const ingredient = (await getIngredients(id)) as IIngredient[]
      setIngredients(ingredient)
    })()
  }, [id])

  if (!recipeDetails) return <div>Lädt Rezept-Details…</div>
  if (!ingredients) return <div>Lädt Zutatenliste…</div>

  return (
    <section className="section_details">
      <img src={recipeDetails.img_url} alt={recipeDetails.name} />
      <h2>{recipeDetails.name}</h2>
      <p>{recipeDetails.description}</p>
      <h3>Portionen</h3>
      <p>{recipeDetails.servings} Portionen</p>
      <h3>Zutaten</h3>
      <ul>
        {}
        {ingredients.map((ingredient: IIngredient) => {
          return (
            <li key={ingredient.id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}, {ingredient.additional_info}
            </li>
          )
        })}
      </ul>
      <h3>Zubereitung</h3>
      <p>{recipeDetails.instructions}</p>
    </section>
  )
}
