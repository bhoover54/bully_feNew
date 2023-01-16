import { Link } from "react-router-dom"

const Footer = () => (
  <div className="p-5 bg-danger text-white d-flex justify-content-center align-items-center gap-3">
    <Link to="/policy" className="text-white">
      Bully Discipline Policy
    </Link>
    copyright 2023
  </div>
)
export default Footer
{
  /* <NavItem>
                  <NavLink className="nav-link" to="/policy">
                    Bully Discipline Policy
                  </NavLink>
                </NavItem> */
}
