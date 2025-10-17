import { useContext } from "react"
import "./ListRecipe.css"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import CardRecipe from "../cardRecipe/CardRecipe"

export default function ListRecipe() {
  const { recipes } = useContext(mainContext) as mainContextProps

  return (
    <>
      {recipes.map((recipe: IRecipe) => {
        return (
          <div key={recipe.id}>
            <CardRecipe
              name={recipe.name}
              desc={`${recipe.description}`}
              link={`${recipe.id}`}
              recipe={recipe}
              img={recipe.img_url}
            />
          </div>
        )
      })}
    </>
  )
}
