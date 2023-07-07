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
            Teachers and Staff Members
          </Link>
          {/*<Link className="rounded p-2 d-block my-1" to="/summary" onClick={() => toggle()}>
            BullyBloxx Quick Summary
          </Link> */}
          <Link to="/report" className="rounded p-2 d-block my-1">
            Report Bullying / Threats / Weapons
          </Link>
          <Link to="/sponsor" className="rounded p-2 d-block my-1">
            CONTRIBUTE for your school's BullyBloxx protection
          </Link>
          <Link className="rounded p-2 d-block my-1" to="/media">
            BullyBloxx Video Library
          </Link>
          <Link className="rounded p-2 d-block my-1" to="/walk-through">
            BullyBloxx Detailed Tutorial
          </Link>
        </div>
      </Col>

      <Col md={8} lg={7} className="mx-auto my-3">
        {/* <iframe width="100%" height="400" src="https://www.youtube.com/embed/-3HWAP4MXU8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
        {/* <iframe width="100%" height="400" src="https://www.youtube.com/embed/P4EDSU8rQHc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
        <h3>How the Bully Periscope Shuts the Bully Down</h3>
        <p className="">
          A "super-weapon" has just been released to bring an end to the long and disastrous war against bullying; it is called "The Bully Periscope". The Bully Periscope
          is the most powerful component of the entire BullyBloxx system.  Please allow us the next 2 minutes to explain how this highly effective safety system protects your
          child.            
        </p>
        <p className="">
          BullyBloxx is and independent, 3rd party system that functions automatically and completely on its own.  Nobody, including town administrators or school administrators,
          have any type of authority or control over this system.
        </p>
        <p className="">
          The BullyBloxx system has it's own bully, threat and weapons reporting functions.  In most cases reports are submitted for students by trusted adults.  This provides 100%
          protection for the reporting student, not even the prindipal knows who they are.
        </p>
        <p className="">
          When a bully report comes in, it is downloaded in both the bully's database as well as the school's database.  A copy of the report is sent to the principal so they can
          shut the abuse down.
        </p>
        <p className="">
          If the bully strikes a 2nd time, a pre-written letter is attached to the 2nd bully report notifying the principal of the next steps that will be taken if
          this bully strikes again.  This letter is posted on the BullyBloxx Letters tab.
        </p> 
        <p className="">
          If the bully strikes a 3rd time, the Bully Periscope takes over.  The trusted adult clicks on the Bully Periscope tab and obtains a complete history of
          reports against this bully showing the numbers of incidents that have been reported against them and the details of their abuse.
        </p> 
        <p className="">
          The trusted adult then clicks on the BullyBloxx Letters tab and obtains the pre-written letter for the Superintendent and board members.  This letter advises
          if the bully strikes again, and is still allowed to remain in school, all communications and letters along with the Bully Periscope Report for this bully 
          (without their name attached) will be provided to local media so the community can be informed of the dangerous levels of bullying that administrators are
          allowing in the schools.
        </p>
        <p className="">
          Long story short; no school board will allow it's members or the district to be publically, but rightfully, drug through the mud in the local media so an
          an undisciplined bully can abuse other students.  That will not happen anywhere.
        </p> 
        <p className="">
            Board Members will give the directive to shut down every bully, even if expulsion is required, before the situation reaches the point where the media is involved.
        </p>
        <p className="">
          Once that directive is issued the immediate result will be a bully free school environment that is solidly protected against bullycides or revenge school shootings.
        </p>
        <p className="">
          To get your schools protected by The Bully Periscope and the BullyBloxx system please click on the Get Your Schools Protected tab at the top left of the home page 
          and follow the directions. And please remember, BullyBloxx doesn’t charge a direct fee for all it provides, it relies on contributions to function. Please contribute 
          so your school’s students can continue to have this great protection.
        </p>
        <p className="">
          If you are a teacher or staff member please click on the Teachers and Staff Members tab to see how you can use The BullyBloxx system just as students can.
        </p>
      </Col>

      

      <h2 className="text-center p-3">
        Ask yourself............would your child be safer at school with or without BullyBloxx?
        {/* To learn how BullyBloxx shuts down bullying in your schools{" "}
        <Link to="/media">CLICK HERE</Link>{" "} */}
      </h2>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <b>Teachers and Staff Members</b>
          <br />
          Through the development of the BullyBloxx system we interviewed countless teachers and staff memeber who worked in schools that turned a blind eye to bullying. 
          These teachers and staff were broken hearted by what they have seen and the helplessness they have felt to do anything but try and comfort the victims. Those days 
          are over. 
          <br />
          Teachers and staff members can report bullying or threats through BullyBloxx just like students can.  If you are a teacher or staff member, over 21 years of age
          here is what to do:
          <br />
          <br />
          Have a trusted relative or friend create a BullyBloxx account and click on the Report Bullying tab and upload a verification video for you.  They can send you
          the username and password for the account as well as a copy of the video and you can submit and your trusted friend or relative will not have to bothered with any
          of it.  Your identity will be 100% protected and you can file a reprt on every bully incident that you see.
        </ModalBody>
      </Modal>
    </Row>
  )
}

export default Home
