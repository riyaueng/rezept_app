import { useContext } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import { Navigate } from "react-router"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loggedIn, loading } = useContext(mainContext) as mainContextProps

  if (loading) {
    return <div>Loading…</div>
  }

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}
