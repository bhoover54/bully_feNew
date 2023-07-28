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
import Periscope from "./pages/periscope"
import TrustedAdult from "./pages/trusted-adult"
import Torpedo from "./pages/torpedo"
import AdminReport from "./pages/admin-report"
import AdminSponsor from "./pages/admin-sponsors"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Media from "./pages/media"
import About from "./pages/about"
import Contact from "./pages/contact"
import Policy from "./pages/policy"
import SchoolAdmin from "./pages/school-administerator"
import Footer from "./pages/footer"
import MessageToMoms from "./pages/message-to-moms"
import Letters from "./pages/letters"
import Letter1 from "./pages/letter1"
import Letter2 from "./pages/letter2"
import Letter3 from "./pages/letter3"
import Letter4 from "./pages/letter4"
import Sit_32 from "./pages/sit-3_2"
import ForgotPassword from "./pages/forgot-password"
import ResetPassword from "./pages/reset-paswod"
import RealEstate from "./pages/real-estate"
import BullyFreeSchool from "./pages/bully-free-school"
import Ambassador from "./pages/ambasador"
import HowItWOrks from "./pages/how-it-work"
import TestBullyBlox from "./pages/test"
import Verification from "./pages/verification"
import BandBooster from "./pages/band"
import WalkThrough from "./pages/walk-through"
import Summary from "./pages/summary"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index={true} element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/report" element={<Report />} />
          <Route path="/uploads" element={<Upload />} />
          <Route path="/periscope" element={<Periscope />} />
          <Route path="/media" element={<Media />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/school/admin" element={<SchoolAdmin />} />
          <Route path="/message-to-moms" element={<MessageToMoms />} />
          <Route path="/trusted-adult" element={<TrustedAdult />} />
          <Route path="/torpedo" element={<Torpedo />} />
          <Route path="/how-bullybloxx-works" element={<HowItWOrks />} />
          <Route path="/letters" element={<Letters />} />
          <Route path="/letter1" element={<Letter1 />} />
          <Route path="/letter2" element={<Letter2 />} />
          <Route path="/letter3" element={<Letter3 />} />
          <Route path="/letter4" element={<Letter4 />} />
          <Route path="/sit-3_2" element={<Sit_32 />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/bully-free-school" element={<BullyFreeSchool />} />
          <Route path="/ambassador" element={<Ambassador />} />
          <Route path="/test-bullybloxx" element={<TestBullyBlox />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/band-booster" element={<BandBooster />} />
          <Route path="/walk-through" element={<WalkThrough />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/admin" element={<Admin />}>
            <Route index={true} element={<AdminSponsor />} />
            <Route path="/admin/report" element={<AdminReport />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
      <ToastContainer autoClose={7000} hideProgressBar position="top-right" />
    </div>
  )
}

export default App
