import { useContext, useEffect, useState } from "react"
import NavCategories from "../../components/navCategories/NavCategories"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import CardRecipe from "../../components/cardRecipe/CardRecipe"
import Button from "../../components/button/Button"

export default function Home() {
  const { recipes } = useContext(mainContext) as mainContextProps
  const [randomRecipes, setRandomRecipes] = useState<IRecipe[]>([])

  // ? ------- Zufällige Rezept-Liste generieren -------

  const shuffleRecipes = (recipes: IRecipe[]): IRecipe[] => {
    const shuffled = [...recipes]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randoom = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[randoom]] = [shuffled[randoom], shuffled[i]]
    }
    return shuffled
  }

  // ? ------ Zufällige Rezept-Liste rendern ------

  useEffect(() => {
    const selectedRecipes = shuffleRecipes(recipes).slice(0, 4)
    setRandomRecipes(selectedRecipes)
  }, [recipes])

  console.log(recipes)
  return (
    <>
      <section className="section_categories">
        <h2>Worauf hast du Lust?</h2>
        <NavCategories />
      </section>

      <section className="section_randoom_recipe">
        <h2>Die beliebtesten Rezepte</h2>
        {randomRecipes.map((recipe) => (
          <div key={recipe.id}>
            <CardRecipe
              name={recipe.name}
              desc={`${recipe.description}`}
              link={`${recipe.id}`}
              recipe={recipe}
              img={recipe.img_url}
            />
          </div>
        ))}
        <Button text="Hier mehr entdecken" link="/rezepte" />
      </section>
    </>
  )
}
