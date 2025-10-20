import { useRef } from "react"
import { Link, useNavigate } from "react-router"
import supabase from "../../utils/supabase"

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current?.value || ""
    const password = passwordRef.current?.value || ""

    // ? ------- Abgleich Daten mit Supabase --------

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Fehler beim Login", error)
      }
      console.log("Login war erfolgreich", data)
      navigate("/profile")
    } catch (error) {
      console.error("Fehler beim Login.", error)
    }
  }

  return (
    <>
      <section className="section_login">
        <div className="min-h-screen m-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="mb-5">Melde dich hier an</h2>
              <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="beispiel@mail.com"
                    ref={emailRef}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="">
                    Passwort
                  </label>
                  <input
                    type="current_password"
                    name="password"
                    placeholder="••••••••"
                    ref={passwordRef}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-orange-primary text-white font-medium rounded-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mb-5">
                  Login
                </button>

                <p className="">
                  Du hast noch kein Profil? Hier geht es zum{" "}
                  <Link to="/signup" className="text-blue-secondary underline">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
