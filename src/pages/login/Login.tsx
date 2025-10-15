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
        <h2>Melde dich hier an</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit autem vero error nam. Odio eaque laudantium,
          quidem voluptate voluptatum porro?
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input type="email" name="email" placeholder="beispiel@mail.com" ref={emailRef} required className="" />
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
              className=""
            />
          </div>

          <button type="submit" className="">
            Login
          </button>

          <p className="">
            Du hast noch kein Profil? Hier geht es zum{" "}
            <Link to="/signup" className="">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </>
  )
}
