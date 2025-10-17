import supabase from "../utils/supabase"

export async function uploadProfileImg(file: File | null) {
  if (!file) return null

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error("Kein eingeloggter Benutzer gefunden")
    return null
  }

  const filePath = `${user.id}/${file.name}`

  const { error } = await supabase.storage.from("profiles_img").upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type,
  })

  if (error) {
    console.error("Fehler beim Hochladen:", error)
    return null
  }

  const { data: publicUrlData } = supabase.storage.from("profiles_img").getPublicUrl(filePath)

  console.log("Bild erfolgreich hochgeladen:", publicUrlData.publicUrl)
  return publicUrlData.publicUrl
}
