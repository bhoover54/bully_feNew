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
import Upload from "./pages/video"
import AdminReport from "./pages/admin-report"
import AdminSponsor from "./pages/admin-sponsors"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index={true} element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/report" element={<Report />} />
          <Route path="/admin" element={<Admin />}>
            <Route index={true} element={<AdminSponsor />} />
            <Route path="/admin/uploads" element={<Upload />} />
            <Route path="/admin/report" element={<AdminReport />} />
          </Route>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
      </Routes>

      <ToastContainer autoClose={7000} hideProgressBar position="top-right" />
    </div>
  )
}

export default App
