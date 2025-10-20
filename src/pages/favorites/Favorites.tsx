import { useContext } from "react"
import { mainContext } from "../../context/MainProvider"
import type { IFavorites } from "../../interfaces/IFavorite"
import Button from "../../components/button/Button"
import ListFavRecipes from "../../components/listFavRecipes/ListFavRecipes"
import type { IProfile } from "../../interfaces/IProfile"

interface IFavoritesProps {
  user: IProfile
  favorites: IFavorites[]
  setFavorites: React.Dispatch<React.SetStateAction<IFavorites[] | unknown>>
}

export default function Favorites() {
  const { favorites } = useContext(mainContext) as unknown as IFavoritesProps

  return (
    <>
      <section className="section_intro">
        <h2 className="my-10 text-grey-fonts">Deine Lieblingsrezepte</h2>
      </section>

      <section className="mb-30">
        {favorites?.length !== 0 ? (
          <ListFavRecipes favorites={favorites} />
        ) : (
          <div className="">
            <p className="">Du hast noch keine Rezepte gespeichert.</p>
            <Button text="Jetzt stöbern" link="/rezepte" />
          </div>
        )}
      </section>
    </>
  )
}
