import { Link } from "react-router-dom"
import { Col, Row } from "reactstrap"

const Home = () => {
  return (
    <Row>
      <p className="text-center fs-1 fw-bold  m-0">Bullybloxx</p>
      <p className="text-center ">
        BullyBloxx empowers a community to provide bully-free schools for its children, and by doing
        so, virtually eliminates the potential for school shootings.
      </p>
      <Col md={8} lg={7} className="mx-auto my-3">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/P4EDSU8rQHc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Col>

      <p className="text-center p-3">
        To learn how BullyBloxx shuts down bullying in your schools{" "}
        <Link to="/media">CLICK HERE</Link>{" "}
      </p>
      <div className="d-flex gap-2 justify-content-center">
        <Link to="/media" className="border rounded p-2">
          Real Estate Pros Please Click HERE
        </Link>
        <Link to="/report" className="border rounded p-2">
          Report Bullying / Threats / Weapons
        </Link>
        <Link to="sponsor" className="border rounded p-2">
          Is your school protected?
        </Link>
      </div>
    </Row>
  )
}

export default Home
