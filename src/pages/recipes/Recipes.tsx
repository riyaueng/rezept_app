import Button from "../../components/button/Button"
import ListRecipe from "../../components/listRecipe/ListRecipe"
import NavCategories from "../../components/navCategories/NavCategories"

export default function Rezepte() {
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

      <section className="">
        <h2 className="my-10 text-grey-fonts">Die beliebtesten Rezepte</h2>
        <ListRecipe />
      </section>

      <section className="section_neue_rezepte">
        <h2>Die neuesten Rezepte</h2>
        <ListRecipe />
      </section>
    </>
  )
}
