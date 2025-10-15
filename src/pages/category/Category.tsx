import { useParams } from "react-router"
import NavCategories from "../../components/navCategories/NavCategories"
import { useContext, useEffect } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import { getRecipeCategoryList } from "../../functions/functions"
import type { IRecipe } from "../../interfaces/IRecipe"
import CardRecipe from "../../components/cardRecipe/CardRecipe"

export default function Category() {
  const { category } = useParams<{ category: string }>()
  const { recipes, setRecipes } = useContext(mainContext) as mainContextProps

  // ? ------ Rezepte unter den Kategorien rendern ------

  useEffect(() => {
    if (!category) return
    ;(async () => {
      const recipe = (await getRecipeCategoryList(category)) as IRecipe[]
      setRecipes(recipe)
    })()
  }, [category])

  if (!recipes) return <div>Lädt Rezepte…</div>

  return (
    <>
      <section className="section_categories">
        <h2>{category}</h2>
        <NavCategories />
      </section>

      <section className="section_category_list">
        {recipes.map((recipe: IRecipe) => {
          return (
            <div key={recipe.id}>
              <CardRecipe name={recipe.name} desc={recipe.description} link={`${recipe.id}`} />
            </div>
          )
        })}
      </section>
    </>
  )
}
