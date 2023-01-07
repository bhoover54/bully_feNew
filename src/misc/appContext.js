import { createContext, useEffect, useState } from "react"
import { getItem, removeItem, setItem } from "./helper"

const AppContext = createContext(null)

export const AppProvider = ({ component }) => {
  const [token, setToken] = useState()
  const [role, setRole] = useState()
  const [check, setCheck] = useState(false)

  const logout = () => {
    removeItem("bly_token")
    removeItem("bly_role")
    setCheck(!check)
  }

  const login = (res) => {
    setItem("bly_token", res.token)
    setItem("bly_role", res.role)
    setCheck(!check)
  }

  useEffect(() => {
    const t = getItem("bly_token")
    const r = getItem("bly_role")
    console.log("working")
    if (r) setRole(r)
    else setRole("")

    if (t) setToken(true)
    else setToken(false)
  }, [check])
  return (
    <AppContext.Provider value={{ token, logout, role, setRole, setToken, login }}>
      {component}
    </AppContext.Provider>
  )
}
export default AppContext
