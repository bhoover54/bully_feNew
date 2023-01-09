import { Link, Outlet } from "react-router-dom"
import { Col, Row } from "reactstrap"

const Admin = () => {
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
