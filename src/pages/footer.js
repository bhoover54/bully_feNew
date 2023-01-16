import { Link } from "react-router-dom"

const Footer = () => (
  <div className="p-5 bg-danger text-white d-flex justify-content-center align-items-center gap-3 mt-5">
    <Link to="/policy" className="text-white">
      Bully Discipline Policy
    </Link>
    copyright 2023
  </div>
)
export default Footer
