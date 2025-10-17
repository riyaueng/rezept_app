import supabase from "../utils/supabase"

export async function addFavorites(userId: string | undefined, recipeId: string) {
  // ? --------- Abfrage nach Favoriten-Liste eines Profils ---------

  const { data: favorites, error: favoritesError } = await supabase
    .from("favorites")
    .select("*")
    .eq("profile_id", userId)

  if (favoritesError) {
    console.error("Fehler beim Aufruf deiner Favoritenliste.", favoritesError)
  }

  console.log(favorites)

  const favoritesId = favorites?.[0].id

  // ? --------- Favoriten-Liste nach vorhandenen Rezepten überprüfen ---------

  const { data: recipe, error: recipeError } = await supabase
    .from("favorite_recipes")
    .select("*")
    .eq("favorites_id", favoritesId)
    .eq("recipe_id", recipeId)

  if (recipeError) {
    console.error("Fehler beim Überprüfen deiner Favoriten-Liste")
  }

  console.log(recipe)

  const recipeExits = recipe?.[0]

  if (recipeExits) {
    console.log(recipeExits)
    return null
  } else {
    // ? --------- Neue Rezepte hinzufügen ---------

    const { error: insertError } = await supabase.from("favorite_recipes").insert({
      favorites_id: favoritesId,
      recipe_id: recipeId,
    })
    if (insertError) {
      console.error("Fehler beim Hinzufügen deiner Rezepte.", insertError)
    } else {
      console.log("Rezept wurde zu deinen Favoriten hinzugefügt.")
    }
  }

  console.log(recipeExits)

  // ? --------- Anzahl der Rezepte aktualisieren ---------
}
