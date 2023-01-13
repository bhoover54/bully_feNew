/* eslint-disable react-hooks/exhaustive-deps */
import jwtDecode from "jwt-decode"
import { createContext, useEffect, useState } from "react"
import { getItem, removeItem, setItem } from "./helper"
import BASE_URL from "./url"

const AppContext = createContext(null)

export const AppProvider = ({ component }) => {
  const [token, setToken] = useState()
  const [role, setRole] = useState()
  const [check, setCheck] = useState(false)
  const [reporter, setReporter] = useState({})
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

  const user = async () => {
    const id = jwtDecode(getItem("bly_token")).id
    const response = await fetch(`${BASE_URL}user/${id}`, {
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    const result = await response.json()
    setReporter(result.data)
    console.log(result.data, "result")
    // return result.data
  }

  useEffect(() => {
    const t = getItem("bly_token")
    const r = getItem("bly_role")
    if (r) setRole(r)
    else setRole("")

    if (t) setToken(true)
    else setToken(false)
    if (!Object.keys(reporter).length) user()
  }, [check])
  return (
    <AppContext.Provider value={{ token, logout, role, setRole, setToken, login, user, reporter }}>
      {component}
    </AppContext.Provider>
  )
}
export default AppContext
