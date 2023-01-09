import { useContext, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import AppContext from "../misc/appContext"
import logo from "../assets/images/logo.png"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav as Nav2,
  NavItem
  //   NavLink
} from "reactstrap"
const Nav = () => {
  const { token, logout, role } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <div>
      <div className="py-1 shadow mb-5 ">
        <div className="container p-0">
          <Navbar expand="md">
            <NavbarBrand href="/">
              <img src={logo} alt="logo" width="50px" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav2 className="me-auto" navbar>
                {/* <NavItem>
                  <Link className="nav-link" to="/donate">
                    Donate
                  </Link>
                </NavItem> */}
                <NavItem>
                  <Link className="nav-link" to="/report">
                    Report
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/sponsor">
                    Sponsor
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/uploads">
                    Video
                  </Link>
                </NavItem>

                {role === "ADMIN" && (
                  <>
                    <NavItem>
                      <Link to="/admin" className="nav-link">
                        Admin
                      </Link>
                    </NavItem>
                    {/* <NavItem>
                      <Link to="/admin/report" className="nav-link">
                        View Reports
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/uploads" className="nav-link">
                        Uploads
                      </Link>
                    </NavItem> */}
                  </>
                )}
              </Nav2>
              <Nav2>
                {token ? (
                  <NavItem>
                    <Link onClick={logout} className="nav-link">
                      Sign out
                    </Link>
                  </NavItem>
                ) : (
                  <>
                    <NavItem>
                      <Link to="/signin" className="nav-link">
                        Sign in
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/signup" className="nav-link">
                        Sign up
                      </Link>
                    </NavItem>
                  </>
                )}
              </Nav2>
            </Collapse>
          </Navbar>
        </div>
      </div>

      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default Nav
