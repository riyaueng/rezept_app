import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { IRecipe } from "../../interfaces/IRecipe"
import { getRecipeDetails } from "../../functions/functions"

export default function Details() {
  const { id } = useParams<{ id: string }>()
  const [recipeDetails, setRecipeDetails] = useState<IRecipe | null>(null)

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const detail = (await getRecipeDetails(id)) as IRecipe[]
      setRecipeDetails(detail[0])
      console.log(detail[0])
    })()
  }, [id])

  if (!recipeDetails) return <div>Lädt Rezept-Details…</div>

  return (
    <>
      <section className="section_details">
        <img src="#" alt="" />
        <h2>{recipeDetails.name}</h2>
        <h3>Kategorie</h3>
        <ul>Liste</ul>
        <p>Desc</p>
      </section>
    </>
  )
}
