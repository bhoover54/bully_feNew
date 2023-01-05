import { Route, Routes } from "react-router-dom"
import "./App.css"
import Admin from "./pages/admin"
import Sponsor from "./pages/sponsor"
import Donate from "./pages/donate"
import Login from "./pages/login"
import Report from "./pages/report"
import Register from "./pages/signup"
import Home from "./pages/home"
import Nav from "./components/nav"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index={true} element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/report" element={<Report />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>

      {/* <Sponsor /> */}
      {/* <Login /> */}
      {/* <Report /> */}
      {/* <Sponsor /> */}
      {/* <Donate /> */}
      {/* <Register /> */}
    </div>
  )
}

export default App
