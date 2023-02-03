import { useContext, useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Col, Row } from "reactstrap"
import AppContext from "../misc/appContext"

const Admin = () => {
  const { role } = useContext(AppContext)
  const navigate = useNavigate()
  if (role && role !== "ADMIN") {
    navigate("/")
  }

  return (
    <Row>
      <Col md="2">
        <Link to="/admin" className="d-block text-decoration-none text-dark py-2">
          Sponsors
        </Link>
        <Link to="/admin/report" className="d-block text-decoration-none text-dark py-2">
          Reports
        </Link>
      </Col>
      {/* <Col md="1"></Col> */}
      <Col md="10">
        <Outlet />
      </Col>
    </Row>
  )
}

export default Admin
