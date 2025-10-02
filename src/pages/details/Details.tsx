import { useContext } from "react"
import { useParams } from "react-router"
import { mainContext } from "../../context/MainProvider"

export default function Details() {
  const { recipes } = useContext(mainContext)
  const { details } = useParams<{ details: string }>()

  return (
    <>
      <section className="section_details">
        <img src="#" alt="" />
        <h2>Rezeptname</h2>
        <h3>Kategorie</h3>
        <ul>Liste</ul>
        <p>Desc</p>
      </section>
    </>
  )
}
