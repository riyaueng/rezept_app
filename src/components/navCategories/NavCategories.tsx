import { useContext } from "react"
import { mainContext } from "../../context/MainProvider"
import type { ICategory } from "../../interfaces/ICategory"
import CardCategories from "../cardCategories/CardCategories"

export default function NavCategories() {
  const { categories } = useContext(mainContext)
  return (
    <section className="flex gap-6 overflow-x-auto overflow-y-hidden py-5 ">
      {categories.map((category: ICategory, index: number) => {
        return (
          <div key={index} className=" text-center ">
            <CardCategories text={category.name} icon={category.icon} link={`/kategorie/${category.id}`} />
          </div>
        )
      })}
    </section>
  )
}
