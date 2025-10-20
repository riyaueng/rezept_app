import { useContext, useEffect, useState } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import supabase from "../../utils/supabase"
import { Link } from "react-router"
import { uploadProfileImg } from "../../functions/uploadProfileImg"

export default function Profile() {
  const { user, setUser } = useContext(mainContext) as mainContextProps
  const [editing, setEditing] = useState<boolean>(false)
  const [newUsername, setNewUsername] = useState<string>("")
  const [profileImg, setprofileImg] = useState<File | null>(null)

  // ? ------- Session und User im Browser prüfen --------

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id)

      if (error) {
        console.error("Fehler beim Fetch", error)
      } else {
        setUser(profile?.[0] || null)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ? ------- Username editieren und speichern --------

  async function handleSave() {
    if (user && newUsername !== user.username) {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: newUsername,
        })
        .eq("id", user.id)

      if (error) {
        console.error("Fehler beim Speichern.", error)
      } else {
        fetchData()
      }
    }
    setEditing(false)
  }

  function handleDoubleClick() {
    if (user) {
      setNewUsername(user.username)
      setEditing(true)
    }
  }

  // ? ------- Foto hochladen und speichern --------

  async function handleUploadImg() {
    if (!profileImg || !user) return null

    try {
      const imgUrl = await uploadProfileImg(profileImg)

      if (imgUrl) {
        setUser((prev) => (prev ? { ...prev, img_url: imgUrl } : prev))
        const { data, error } = await supabase.from("profiles").update({ img_url: imgUrl }).eq("id", user.id)
        console.log(data)
        console.log(error)
      }
      return imgUrl
    } catch (error) {
      console.error("Fehler beim Upload des Fotos.", error)
    }
  }

  return (
    <>
      <section className="p-20">
        <h2 className="mb-10">Willkommen {user?.username}</h2>

        <div className="mb-16">
          {user ? (
            <div className="mb-5">
              <div className="w-45 h-45 flex items-center justify-center overflow-hidden relative rounded-full mb-5">
                <img src={user.img_url} alt="Profile" className="w-full h-full object-cover" />
              </div>

              <div className="mb-8">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setprofileImg(e.target.files[0])
                    }
                  }}
                  className="mb-5"
                />
                {profileImg && (
                  <button onClick={handleUploadImg} className="">
                    Upload Photo
                  </button>
                )}
              </div>

              <div onDoubleClick={handleDoubleClick} className="">
                <p className="">Profilename: </p>
                {editing ? (
                  <input
                    type="text"
                    placeholder="Change your username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className=""
                  />
                ) : (
                  <p className="">{user.username}</p>
                )}
              </div>

              <div className="">
                <p className="">
                  Vorname: <span className="">{user.firstname}</span>
                </p>
                <p className="">
                  Nachname: <span className="">{user.lastname}</span>
                </p>
              </div>

              {editing && (
                <button onClick={handleSave} className="">
                  Save
                </button>
              )}

              <Link to="/" className="">
                Zurück zur Startseite
              </Link>
            </div>
          ) : (
            <p className="">Profile wurde nicht gefunden.</p>
          )}
        </div>
      </section>
    </>
  )
}
