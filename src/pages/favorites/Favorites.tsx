import { useContext } from "react"
import { mainContext } from "../../context/MainProvider"
import type { IFavorites } from "../../interfaces/IFavorite"
import Button from "../../components/button/Button"
import ListFavRecipes from "../../components/listFavRecipes/ListFavRecipes"

interface IFavoritesProps {
  favorites: IFavorites[]
}

export default function Favorites() {
  const { favorites } = useContext(mainContext) as unknown as IFavoritesProps

  return (
    <>
      <section className="section_intro">
        <h2>Deine Lieblingsrezepte</h2>
      </section>

      <section className="section_favorites_list">
        {favorites.length === 0 ? (
          <div className="">
            <p className="">Du hast noch keine Rezepte gespeichert.</p>
            <Button text="Jetzt stöbern" link="/rezepte" />
          </div>
        ) : (
          <ListFavRecipes />
        )}
      </section>
    </>
  )
}
