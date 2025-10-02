import { useParams } from "react-router"
import NavCategories from "../../components/navCategories/NavCategories"

export default function Category() {
  const { category } = useParams<{ category: string }>()
  return (
    <>
      <section className="section_categories">
        <h2>{category}</h2>
        <NavCategories />
      </section>

      <section className="section_category_list"></section>
    </>
  )
}
