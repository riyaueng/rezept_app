import { Link, useNavigate } from "react-router"
import supabase from "../../utils/supabase"

export default function SignUp() {
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    console.log(formData)
    const signUpData = Object.fromEntries(formData.entries()) as {
      email: string
      password: string
      username: string
      firstname: string
      lastname: string
    }

    console.log(signUpData)

    const { email, password, username, firstname, lastname } = signUpData

    // ? ------- Abgleich Daten mit Supabase --------

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            firstname: firstname,
            lastname: lastname,
          },
        },
      })

      if (error) {
        console.error("Fehler beim Sign up", error)
      }
      console.log("Sign up war erfolgreich", data)
      navigate("/profile")
    } catch (error) {
      console.error("Fehler beim Sign up", error)
    }
  }

  return (
    <section className="section_signup">
      <h2>Erstelle dir ein Profil</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit autem vero error nam. Odio eaque laudantium,
        quidem voluptate voluptatum porro?
      </p>

      <form onSubmit={handleSignUp} className="">
        <div>
          <input type="text" name="firstname" placeholder="Vorname" required className="" />
        </div>

        <div>
          <input type="text" name="lastname" placeholder="Nachname" required className="" />
        </div>

        <div>
          <input type="text" name="username" placeholder="Profilname" required className="" />
        </div>

        <div>
          <input type="email" name="email" placeholder="Email" required className="" />
        </div>
        <div>
          <input type="current_password" name="password" placeholder="Passwort" required className="" />
        </div>

        <button type="submit" className="">
          Sign Up
        </button>

        <p className="">
          Du hast schon ein Profil? Hier geht es zum{" "}
          <Link to="/login" className="">
            Login
          </Link>
        </p>
      </form>
    </section>
  )
}
