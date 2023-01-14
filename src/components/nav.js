import { useContext, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()
  return (
    <div>
      <div className="py-1 shadow mb-5 ">
        <div className="container-fluid px-md-3 p-0">
          <Navbar expand="md">
            <NavbarBrand>
              <img src={logo} alt="logo" width="70px" onClick={() => navigate("/")} role="button" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav2 className="me-auto" navbar>
                {/* <NavItem>
                  <Link className="nav-link" to="/donate">
                    Donate
                  </Link>
                </NavItem> */}
                {/* <NavItem>
                  <Link className="nav-link" to="/report">
                    Report
                  </Link>
                </NavItem> */}
                <NavItem>
                  <Link className="nav-link" to="/sponsor">
                    Get Your Schools Protected
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/uploads">
                    Search Videos
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/periscope">
                    Order Periscope Report
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/media">
                    Media
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/policy">
                    Bully Discipline Policy
                  </Link>
                </NavItem>

                {role === "ADMIN" && (
                  <>
                    <NavItem>
                      <Link to="/admin" className="nav-link">
                        School Administrators
                      </Link>
                    </NavItem>
                  </>
                )}
                <NavItem>
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </NavItem>
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
