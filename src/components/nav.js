import { useContext, useState } from "react"
import { Outlet, useNavigate, NavLink, Link } from "react-router-dom"
import AppContext from "../misc/appContext"
import logo from "../assets/images/blyblox.jpeg"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav as Nav2, NavItem, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from "reactstrap"
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
              <img src={logo} alt="logo" width="50px" onClick={() => navigate("/")} role="button" className="rounded-circle" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              {!role || role !== "ADMIN" ? (
                <Nav2 className="me-auto" navbar>
                { /* <NavItem>
                    <NavLink className={`nav-link ${activeClass}`} to="/sponsor">
                      Get Your Schools Protected
                    </NavLink>
                  </NavItem> */ }
                  <NavItem>
                    <NavLink className={`nav-link ${activeClass}`} to="/how-bullybloxx-works">
                      How it works
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={`nav-link ${activeClass}`} to="/message-to-moms">
                      Message to Moms
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/bully-free-school">
                      Bully-Free Schools
                    </NavLink>
                  </NavItem>

                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>More</DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link className=" text-dark" to="/periscope">
                          Order Periscope Report
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className=" text-dark" to="/policy">
                          BullyBloxx Discipline Policy
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className=" text-dark" to="/letters">
                          BullyBloxx Letters
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className=" text-dark" to="/ambassador">
                          Bully Shut Down Ambassadors
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className="text-dark" to="/media">
                          BullyBloxx Video Library
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className="text-dark" to="/school/admin">
                          School Administrator
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className=" text-dark" to="/uploads">
                          Search Videos
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className="text-dark" to="/about">
                          About
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className="text-dark" to="/contact">
                          Contact
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav2>
              ) : (
                <></>
              )}

              <Nav2>
                {role === "ADMIN" && (
                  <>
                    <NavItem>
                      <NavLink to="/admin" className="nav-link">
                        Admin
                      </NavLink>
                    </NavItem>
                  </>
                )}
                {token ? (
                  <NavItem>
                    <Button onClick={logout} className="nav-link bg-transparent border-0">
                      Sign out
                    </Button>
                  </NavItem>
                ) : (
                  <div className="d-md-flex">
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
                  </div>
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
