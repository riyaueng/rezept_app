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
    const selectedRecipes = shuffleRecipes(recipes).slice(0, 3)
    setRandomRecipes(selectedRecipes)
  }, [recipes])

  console.log(recipes)
  return (
    <>
      <section className="bg-[url('/img/header_bg.png')] bg-cover bg-center bg-no-repeat mb-10">
        <div className="w-5sxl flex items-center justify-start overflow-hidden relative px-20 py-24">
          <div className="w-120 h-120 rounded-full bg-orange-light">
            <img
              src="/public/img/header_hero.jpg"
              alt="Vegange Pokebowl"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute top-56 right-80  text-left ">
            <h1 className="text-grey-fonts text-7xl leading-20 mb-5">
              Entdecke neue <br />
              <span className="text-orange-primary font-headline">leckere Rezepte</span>
            </h1>
            <p className="text-left uppercase tracking-wider mb-16 text-2xl">Jetzt stöbern gehen</p>
            <Button text="Zum Rezeptbuch" link="/rezepte" style="text-3xl" />
          </div>
          <div>
            <img
              src="/public/img/illustration_cookingpan.png"
              alt="Illustration Pfanne mit Gemüse"
              className="w-120 absolute top-40 right-20 text-left"
            />
          </div>
        </div>
      </section>
      <section className="mb-10">
        <h2 className="my-5 text-grey-fonts">Worauf hast du Lust?</h2>
        <NavCategories />
      </section>

      <section className="mb-30">
        <h2 className="my-5 text-grey-fonts">Die beliebtesten Rezepte</h2>
        <div className="flex flex-wrap justify-between gap-8">
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
        </div>
        <div className="flex items-center my-8">
          <Button text="Hier mehr entdecken" link="/rezepte" />
        </div>
      </section>
    </>
  )
}
