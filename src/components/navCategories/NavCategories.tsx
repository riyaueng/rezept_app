import { useContext } from "react"
import { mainContext } from "../../context/MainProvider"
import type { ICategory } from "../../interfaces/ICategory"
import CardCategories from "../cardCategories/CardCategories"

export default function NavCategories() {
  const { categories } = useContext(mainContext)

  return (
    <>
      {categories.map((category: ICategory, index: number) => {
        return (
          <div key={index}>
            <CardCategories text={category.name} image="#" link={`kategorie/${category.name}`} />
          </div>
        )
      })}
    </>
  )
}
