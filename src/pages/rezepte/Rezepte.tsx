import ListRecipe from "../../components/listRecipe/ListRecipe"
import NavCategories from "../../components/navCategories/NavCategories"

export default function Rezepte() {
  return (
    <>
      <section className="section_categories">
        <h2>Worauf hast du Lust?</h2>
        <NavCategories />
      </section>

      <section className="section_rezepte">
        <h2>Die beliebtesten Rezepte</h2>
        <ListRecipe />
      </section>

      <section className="section_neue_rezepte">
        <h2>Die neuesten Rezepte</h2>
        <ListRecipe />
      </section>
    </>
  )
}
