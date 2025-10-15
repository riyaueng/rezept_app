import { useContext, useEffect, useState } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import supabase from "../../utils/supabase"
import { Link } from "react-router"

export default function Profile() {
  const { user, setUser } = useContext(mainContext) as mainContextProps
  const [editing, setEditing] = useState<boolean>(false)
  const [newUsername, setNewUsername] = useState<string>("")

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

  // ? ------- Editieren und Speichern --------

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

  return (
    <section className="section_profile">
      <h2>Willkommen {user?.username}</h2>

      <div className="">
        {user ? (
          <div className="">
            <div onDoubleClick={handleDoubleClick} className="">
              <p className="">Profilename</p>
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
  )
}
