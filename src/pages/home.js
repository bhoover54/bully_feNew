import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Col, Row, ModalBody, Modal } from "reactstrap"
import banner from "../assets/images/banner.jpeg"
import AppContext from "../misc/appContext"
const Home = () => {
  const { logout } = useContext(AppContext)
  const [modal, setModal] = useState(false)

  const session = () => {
    const getSession = sessionStorage.getItem("welcome")
    if (!getSession) {
      logout()
      sessionStorage.setItem("welcome", true)
      return
    }
  }

  const toggle = () => setModal(!modal)

  useState(() => {
    session()
  }, [])

  return (
    <Row>
      <Col md="6">
        <div className="banner">
          <img src={banner} width="100%" alt="" />
        </div>
      </Col>
      <Col md="6" className="d-flex flex-column justify-content-center p-3">
        <h3 className="">
          BullyBloxx empowers a community to provide bully-free schools for its children, and by doing so, virtually eliminates the potential for school shootings and bullycides.
          {/* BullyBloxx empowers a community to provide bully-free schools for its children, and by doing so, virtually eliminates the potential for
          school shootings. */}
        </h3>
        <div className="">
          <Link className="rounded p-2 d-block my-1" onClick={() => toggle()}>
            Real Estate Pros - Please Click Here
          </Link>
          <Link to="/report" className="rounded p-2 d-block my-1">
            Report Bullying / Threats / Weapons
          </Link>
          <Link to="/sponsor" className="rounded p-2 d-block my-1">
            DONATE for your school's BullyBloxx protection
          </Link>
          <Link className="rounded p-2 d-block my-1" to="/media">
            BullyBloxx Video Library
          </Link>
        </div>
      </Col>

      <Col md={8} lg={7} className="mx-auto my-3">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/-3HWAP4MXU8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        {/* <iframe width="100%" height="400" src="https://www.youtube.com/embed/P4EDSU8rQHc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
      </Col>

      <h2 className="text-center p-3">
        Ask yourself............would your child be safer at school with or without BullyBloxx?
        {/* To learn how BullyBloxx shuts down bullying in your schools{" "}
        <Link to="/media">CLICK HERE</Link>{" "} */}
      </h2>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          If you are a real estate professional, thanks to BullyBloxx, you alone have the ability to transform your community into a bully free community for all students K-12. BullyBloxx allows you to serve as a Bully Shutdown Ambassador for up to 3 schools meaning that you alone can make your
          community’s elementary school, middle school and high school all bully-free. BullyBloxx also makes the exception for you to serve as a Bully Shutdown Ambassador for a 4th school if your community has a Jr. High School or 4th school of any type. The market desirability and value of every
          home skyrockets when their students have bully-free schools to attend.
          <br />
          <br />
          Make a difference, make your community’s schools bully-free and be the face of that bully-free community. This is not only an incredibly noble thing to do for your community, it is also very good for your business. To view information video on the value to you, your community and your
          business of becoming a Bully Shutdown Ambassador in your area school/schools please <Link to="/media"> CLICK HERE</Link>
          <br />
          <br />
          To submit a Bully Shutdown Ambassador request for a school / schools in your area please <Link to="/sponsor">CLICK HERE</Link>
        </ModalBody>
      </Modal>
    </Row>
  )
}

export default Home
