import Header from "../components/header/Header"
import { Outlet } from "react-router"
import Footer from "../components/footer/Footer"

export default function Layout() {
  return (
    <div className="m-0 mx-auto flex flex-col min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
