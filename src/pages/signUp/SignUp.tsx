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
      <div className="min-h-screen m-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="mb-5">Erstelle dir ein Profil</h2>
            <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit autem vero error nam.</p>

            <form onSubmit={handleSignUp} className="">
              <div className="mb-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="Vorname"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="lastname"
                  placeholder="Nachname"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Profilname"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="mb-5">
                <input
                  type="current_password"
                  name="password"
                  placeholder="Passwort"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-primary text-white font-medium rounded-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mb-5">
                Sign Up
              </button>

              <p className="">
                Du hast schon ein Profil? Hier geht es zum{" "}
                <Link to="/login" className="text-blue-secondary underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
