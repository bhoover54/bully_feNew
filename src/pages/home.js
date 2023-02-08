import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Col, Modal, ModalBody, Row } from "reactstrap"
import banner from "../assets/images/banner.jpeg"
import AppContext from "../misc/appContext"
const Home = () => {
  const { logout } = useContext(AppContext)
  const [openModal, setOpenModal] = useState(false)
  const session = () => {
    const getSession = sessionStorage.getItem("welcome")
    if (!getSession) {
      logout()
      sessionStorage.setItem("welcome", true)
      return
    }
  }

  const toggle = () => setOpenModal(!openModal)

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
          BullyBloxx empowers a community to provide bully-free schools for its children, and by doing so, virtually eliminates the potential for
          school shootings and bullycides.
          {/* BullyBloxx empowers a community to provide bully-free schools for its children, and by doing so, virtually eliminates the potential for
          school shootings. */}
        </h3>
        <div className="">
          <Link to="/real-estate" className="rounded p-2 d-block my-1">
            Real Estate Pros Please Click HERE
          </Link>
          <Link onClick={toggle} className="rounded p-2 d-block my-1">
            Report Bullying / Threats / Weapons
          </Link>
          <Link to="/sponsor" className="rounded p-2 d-block my-1">
            DONATE for your school's BullyBloxx protection
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

      <h2 className="text-center p-3">
        Ask yourself............would your child be safer at school with or without BullyBloxx?
        {/* To learn how BullyBloxx shuts down bullying in your schools{" "}
        <Link to="/media">CLICK HERE</Link>{" "} */}
      </h2>

      <Modal isOpen={openModal} toggle={toggle}>
        <ModalBody>
          <p>
            The first step to reporting bullying through BullyBloxx is to confirm that the incident meets the standards to be labeled a bullying
            incident. Below are some very simple guidelines that will quickly help you determine if an incident meets these requirements:
          </p>
          <p>It IS NOT BULLYING when:</p>
          <ol>
            <li>Someone says or does something hurtful UNINTENTIONALLY and they only do it once; that is called being RUDE.</li>
            <li>Someone says or does something hurtful INTENTIONALLY and they only do it once; that is called being MEAN.</li>
          </ol>
          <h5>HOWEVER</h5>
          <p>
            When someone says or does something hurtful INTENTIONALLY and they do it MORE THAN ONCE, even when you tell them to stop or they can see
            that you are upset………...THAT IS BULLYING and it should be reported EVERY TIME it occurs.
          </p>
          <p>
            If this incident meets the standards for bullying please <Link to="/report"> CLICK HERE </Link> to access the Bully Reporting Forms.{" "}
          </p>
        </ModalBody>
      </Modal>
    </Row>
  )
}

export default Home
