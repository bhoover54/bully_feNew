import { useContext, useState } from "react"
import { Outlet, useNavigate, NavLink } from "react-router-dom"
import AppContext from "../misc/appContext"
import logo from "../assets/images/logo.png"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav as Nav2, NavItem } from "reactstrap"
const Nav = () => {
  const { token, logout, role } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  const navigate = useNavigate()

  const activeClass = ({ isActive }) => (isActive ? "active" : "")
  return (
    <div>
      <div className="p-0 ">
        <div className="container-fluid p-0 mb-5 ">
          <Navbar expand="md" className="navbar-dark">
            <NavbarBrand>
              <img src={logo} alt="logo" width="70px" onClick={() => navigate("/")} role="button" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav2 className="me-auto" navbar>
                <NavItem>
                  <NavLink className={`nav-link ${activeClass}`} to="/sponsor">
                    Get Your Schools Protected
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/uploads">
                    Search Videos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/periscope">
                    Order Periscope Report
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/media">
                    Media
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/school/admin">
                    School Administrator
                  </NavLink>
                </NavItem>

                {role === "ADMIN" && (
                  <>
                    <NavItem>
                      <NavLink to="/admin" className="nav-link">
                        Admin
                      </NavLink>
                    </NavItem>
                  </>
                )}
                <NavItem>
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </NavItem>
              </Nav2>
              <Nav2>
                {token ? (
                  <NavItem>
                    <NavLink onClick={logout} className="nav-link">
                      Sign out
                    </NavLink>
                  </NavItem>
                ) : (
                  <>
                    <NavItem>
                      <NavLink to="/signin" className="nav-link">
                        Sign in
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/signup" className="nav-link">
                        Sign up
                      </NavLink>
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
