import { useContext } from "react"
import "./ListRecipe.css"
import { mainContext } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import CardRecipe from "../cardRecipe/CardRecipe"

export default function ListRecipe() {
  const { recipes } = useContext(mainContext)

  return (
    <>
      {recipes.map((recipe: IRecipe) => {
        return (
          <>
            <div key={recipe.id}>
              <CardRecipe name={recipe.name} desc={recipe.description} link={`rezept/${recipe.id}`} />
            </div>
          </>
        )
      })}
    </>
  )
}
