import Button from "../../components/button/Button"
import ListRecipe from "../../components/listRecipe/ListRecipe"
import NavCategories from "../../components/navCategories/NavCategories"

export default function Rezepte() {
  return (
    <>
      <section className="bg-[url('/img/header_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed mb-10 ">
        <div className="w-full flex items-center justify-start overflow-hidden relative px-50 py-24">
          <div className="w-140 h-140 rounded-full bg-orange-light">
            <img
              src="/public/img/header_hero.jpg"
              alt="Vegange Pokebowl"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute top-76 left-140 text-left ">
            <h1 className="text-grey-fonts text-7xl leading-20 mb-5">
              Entdecke neue <br />
              <span className="text-orange-primary font-headline">leckere Rezepte</span>
            </h1>
            <p className="text-left uppercase tracking-wider mb-16 text-2xl ">Jetzt stöbern gehen</p>
            <Button text="Zum Rezeptbuch" link="/rezepte" style="text-3xl" />
          </div>
          <div>
            <img
              src="/public/img/illustration_cookingpan.png"
              alt="Illustration Pfanne mit Gemüse"
              className="w-130 absolute top-40 right-50 text-left"
            />
          </div>
        </div>
      </section>

      <section className="mb-10 mx-30">
        <h2 className="my-5 text-grey-fonts">Worauf hast du Lust?</h2>
        <NavCategories />
      </section>

      <section className="mx-30 mb-20">
        <h2 className="my-10 text-grey-fonts">Die neuesten Rezepte</h2>
        <ListRecipe />
      </section>
    </>
  )
}
