import { Link } from "react-router-dom"
import { Col, Row } from "reactstrap"
import banner from "../assets/images/banner.jpeg"
const Home = () => {
  return (
    <Row>
      <Col md="6">
        <div className="banner">
          <img src={banner} width="100%" alt="" />
        </div>
      </Col>
      <Col md="6" className="d-flex flex-column justify-content-center p-3">
        <h3 className="">
          BullyBloxx empowers a community to provide bully-free schools for its children, and by doing so, virtually eliminates the potential for
          school shootings and bullycides.
          {/* BullyBloxx empowers a community to provide bully-free schools for its children, and by doing so, virtually eliminates the potential for
          school shootings. */}
        </h3>
        <div className="">
          <Link to="/media" className="rounded p-2 d-block my-1">
            Real Estate Pros Please Click HERE
          </Link>
          <Link to="/report" className="rounded p-2 d-block my-1">
            Report Bullying / Threats / Weapons
          </Link>
          <Link to="sponsor" className="rounded p-2 d-block my-1">
            Is your school protected?
          </Link>
        </div>
      </Col>

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
        Ask yourself............would your child be safer at school with or without BullyBloxx?
        {/* To learn how BullyBloxx shuts down bullying in your schools{" "}
        <Link to="/media">CLICK HERE</Link>{" "} */}
      </p>
    </Row>
  )
}

export default Home
