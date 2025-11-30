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
      <section className="mx-30">
        <h2 className="my-10 text-grey-fonts">Deine Lieblingsrezepte</h2>
      </section>

      <section className="mx-30 mb-20">
        {favorites?.length !== 0 ? (
          <ListFavRecipes favorites={favorites} />
        ) : (
          <div className="min-h-screen mt-10">
            <p className="">Du hast noch keine Rezepte gespeichert.</p>
            <div className="my-10">
              <Button text="Jetzt stöbern" link="/rezepte" />
            </div>
          </div>
        )}
      </section>
    </>
  )
}
